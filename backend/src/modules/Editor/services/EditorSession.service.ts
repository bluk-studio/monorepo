import { EResourceType, IEditorCollaborator, IEditorContentChange, IEditorSession, IParsedContentChange } from '@app/shared';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PubSub } from 'graphql-subscriptions';
import { Types } from 'mongoose';
import { ProfileService } from 'src/modules/Profile/services';

// RawEditorCollaborator interface
interface RawEditorCollaborator extends IEditorCollaborator {
  ping: number,
};

// RawEditorChange interface
interface RawEditorChange extends IEditorContentChange {
  id: number,
  timestamp: number,
};

// RawEditorSession interface
interface RawEditorSession extends Partial<IEditorSession> {
  resourceId: Types.ObjectId,
  resourceType?: EResourceType,
  collaborators: RawEditorCollaborator[],
  changes: RawEditorChange[],
  changeCounter: number,
};

// Exporting EditorSessionService
@Injectable()
export class EditorSessionService {
  constructor(
    private readonly profileService: ProfileService,
  ) {}

  // Current sessions array
  // +todo move to database??? or to redis, maybe
  public sessions: RawEditorSession[] = [];

  // public fetchById
  async fetchById(
    resourceId: string | Types.ObjectId,
    resourceType?: EResourceType,
  ): Promise<RawEditorSession> {
    let session = this.sessions.find((session) => session.resourceId == resourceId);

    // Creating new session
    if (!session) {
      session = <RawEditorSession>{
        resourceId,
        resourceType,
        collaborators: [],
        changes: [],
        changeCounter: 0,
      };

      // Pushing to sessions object
      this.sessions.push(session);
    };

    return session;
  };

  // public addCollaborator
  public async addCollaborator(
    profileId: string | Types.ObjectId,

    resourceId: string | Types.ObjectId,
    resourceType?: EResourceType,
  ) {
    const session = await this.fetchById(resourceId, resourceType);

    // Fetching this profile
    const profile = await this.profileService.fetchById(profileId);
    if (!profile) throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);

    // Checking if this collaborator is in this session
    let collaborator = session.collaborators.find((x) => String(x._id) == String(profileId));

    // Creating new collaborator information
    // or updating ping property of old collaborator
    if (!collaborator) {
      collaborator = {
        _id: profile._id,
        email: profile.email,
        username: profile.username,
        ping: Date.now() / 1000,
        offset: 0,
      };
    } else {
      collaborator.ping = Date.now() / 1000;
    };

    // Updating
    const index = session.collaborators.findIndex((x) => String(x._id) == String(profileId));
    session.collaborators[index >= 0 ? index : 0] = collaborator;
    this.sessions[this.sessions.findIndex((x) => x.resourceId == session.resourceId)] = session;

    // Publishing update event
    // +todo
    // this.pubSub.publish(EDITORSESSION_SUBSCRIPTION_NAME, { resourceType: session.resourceType, resourceId: session.resourceId });
  };

  // public removeCollaborator
  public async removeCollaborator(
    collaboratorId: string | Types.ObjectId,

    resourceId: string | Types.ObjectId,
    resourceType?: EResourceType,
  ) {
    // Getting this session
    const session = await this.fetchById(resourceId, resourceType);

    this.sessions[this.sessions.findIndex((x) => x.resourceId == session.resourceId)] = {
      ...session,
      ...{
        collaborators: session.collaborators.filter((x) => x._id != collaboratorId),
      },
    };

    // Triggering update event
    // +todo
    // this.pubSub.publish(EDITORSESSION_SUBSCRIPTION_NAME, { resourceType: session.resourceType, resourceId: session.resourceId });
  };

  // public setCollaboratorCursor
  public async setCollaboratorCursor(
    collaboratorId: string | Types.ObjectId,
    offset: number,

    resourceId: string | Types.ObjectId,
    resourceType?: EResourceType
  ) {
    // Adding this collaborator (and creating session and adding this collaborator
    // to collaborators property and adadada)
    await this.addCollaborator(collaboratorId, resourceId, resourceType);

    // Getting this session
    const session = await this.fetchById(resourceId, resourceType);

    // Updating this collaborator's cursor
    const collaborator = session.collaborators.find((x) => String(x._id) == String(collaboratorId));
    collaborator.offset = offset;

    session.collaborators[session.collaborators.findIndex((x) => x._id == collaboratorId)] = collaborator;
    
    this.sessions[this.sessions.findIndex((x) => x.resourceId == resourceId)] = session;

    // Triggering update event
    // +todo
    // this.pubSub.publish(EDITORSESSION_SUBSCRIPTION_NAME, { resourceType: session.resourceType, resourceId: session.resourceId });
  };

  // public addChange
  public async addChange(
    collaboratorId: string | Types.ObjectId,
    change: IParsedContentChange,

    resourceId: string | Types.ObjectId,
    resourceType?: EResourceType
  ) {
    // Fetching this session
    const session = await this.fetchById(resourceId, resourceType);
    
    await this.addCollaborator(collaboratorId, resourceId, resourceType);

    // Adding this change information
    session.changeCounter = session.changeCounter + 1;
    session.changes.push({
      id: session.changeCounter,
      collaboratorId: new Types.ObjectId(collaboratorId),
      change,
      timestamp: (Date.now() / 1000)
    });
    this.sessions[this.sessions.findIndex((x) => x.resourceId == resourceId)] = session;

    // Triggering update event
    // +todo
    // this.pubSub.publish(EDITORSESSION_SUBSCRIPTION_NAME, { resourceType: session.resourceType, resourceId: session.resourceId });
  };

  // public removeChange
  public async removeChange(
    change: RawEditorChange,
    
    resourceId: string | Types.ObjectId,
    resourceType?: EResourceType
  ) {
    const session = await this.fetchById(resourceId, resourceType);

    // Fetching this change
    const editorChange = session.changes.find((x) => x == change);
    if (!editorChange) return;

    // Removing this change from session storage
    session.changes = session.changes.filter((x) => x != change);
    this.sessions[this.sessions.findIndex((x) => x.resourceId == session.resourceId)] = session;

    // Triggering update event
    // +todo
    // this.pubSub.publish(EDITORSESSION_SUBSCRIPTION_NAME, { resourceType: session.resourceType, resourceId: session.resourceId });
  };
};

// Exporting EditorSessionCronService
@Injectable()
export class EditorSessionCronService {
  constructor(
    private readonly editorSession: EditorSessionService,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  public async handleCron() {
    this.editorSession.sessions.forEach((session) => {
      this._handleSession(session);
    });
  };

  // private _handleSession
  private _handleSession(session: RawEditorSession) {
    const now = Date.now() / 1000;
    
    // Handling this session's collaborators
    session.collaborators.forEach((collaborator) => {
      if ((now - collaborator?.ping) > 6) {
        // Removing dead collaborator
        this.editorSession.removeCollaborator(collaborator._id, session.resourceId, session.resourceType);
      };
    });

    // Handling changes
    session.changes.forEach((change) => {
      if ((now - change?.timestamp) > 6) {
        // Removing this change
        this.editorSession.removeChange(change, session.resourceId, session.resourceType);
      };
    });
  };
};