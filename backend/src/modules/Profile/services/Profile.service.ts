import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';
import { Profile, ProfileDocument } from 'src/types';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('Profile')
    private Profile: Model<ProfileDocument>,
  ) {}

  // public fetchByEmail
  // - Fetch user by their email
  public async fetchByEmail(email: string): Promise<Profile> {
    return await this.Profile.findOne({ email });
  }

  // public fetchById
  public async fetchById(id: string | Types.ObjectId): Promise<Profile> {
    let _id: Types.ObjectId;
    if (id instanceof Types.ObjectId) {
      _id = id;
    } else {
      _id = new Types.ObjectId(id);
    }

    return await this.Profile.findOne({ _id });
  }

  // public create
  // - Create new profile with
  // passed email and username
  public async create(email: string, username?: string): Promise<Profile> {
    return await new this.Profile({ email, username }).save();
  }
}
