var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,o=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,i=(t,r,o)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[r]=o;import{L as s,W as d,M as c,N as l,O as p,C as u}from"./vendor-adcc401c.js";const g=new s.HttpLink({uri:"http://localhost:3001/graphql"}),b=new d({uri:"ws://localhost:3001/graphql",options:{reconnect:!0},webSocketImpl:c}),j=p({link:s.split((({query:e})=>{const t=l(e);return"OperationDefinition"===t.kind&&"subscription"===t.operation}),b,g),credentials:"include",cache:new s.InMemoryCache}),h=s.gql`
  mutation Login($token: String!) {
    login(token: $token) {
      _id
      email
      username
    }
  }
`,I=s.gql`
  query me {
    me {
      _id
      email
      token
    }
  }
`,m=s.gql`
  query ProfileProjects {
    ProfileProjects {
      _id
      name
      description
    }
  }
`,$=s.gql`
  query Project($projectId: String!) {
    Project(projectId: $projectId) {
      _id
      name
      description
    }
  }
`,y=s.gql`
  mutation CreateProject($input: CreateProjectInput!) {
    CreateProject(input: $input) {
      _id
    }
  }
`,v="\ntype\nenabled\nx\ny\nheight\nwidth\n",P=`\nwidgets {\n  __typename\n  ...on ControlsWidget {\n    ${v}\n  }\n  ...on ConsoleWidget {\n    ${v}\n  }\n  ...on PlayersWidget {\n    ${v}\n  }\n  ...on LogsWidget {\n    ${v}\n  }\n}\n`;s.gql`
  mutation UpdateConsoleWidget(
    $dashboardId: String!
    $input: ConsoleWidgetInput!
  ) {
    UpdateConsoleWidget(
      dashboardId: $dashboardId
      input: $input
    ) {
      _id
      name
    }
  }
`,s.gql`
  mutation UpdateControlsWidget(
    $dashboardId: String!
    $input: ControlsWidgetInput!
  ) {
    UpdateControlsWidget(
      dashboardId: $dashboardId
      input: $input
    ) {
      _id
      name
    }
  }
`,s.gql`
  mutation UpdateLogsWidget(
    $dashboardId: String!
    $input: LogsWidgetInput!
  ) {
    UpdateLogsWidget(
      dashboardId: $dashboardId
      input: $input
    ) {
      _id
      name
    }
  }
`,s.gql`
  mutation UpdatePlayersWidget(
    $dashboardId: String!
    $input: PlayersWidgetInput!
  ) {
    UpdatePlayersWidget(
      dashboardId: $dashboardId
      input: $input
    ) {
      _id
      name
    }
  }
`;const S=s.gql`
  query CurrentDashboardConfig($projectId: String!) {
    CurrentProjectDashboard(projectId: $projectId) {
      _id
      name
      ${P}
    }
  }
`;s.gql`
  query ProjectDashboardByProfile($profileId: String!) {
    ProjectDashboardByProfile(projectId: $projectId) {
      _id
      name
      ${P}
    }
  }
`;const f=s.gql`
  mutation UpdateProjectDashboard(
    $dashboardId: String!
    $input: UpdateDashboardConfigInput!
  ) {
    UpdateProjectDashboard(
      dashboardId: $dashboardId
      input: $input
    ) {
      _id
      name
    }
  }
`,w=s.gql`
  query OnlineMode($projectId: String!) {
    Project(projectId: $projectId) {
      settings {
        server {
          onlineMode
        }
      }
    }
  }
`,q=s.gql`
  query Whitelist($projectId: String!) {
    Project(projectId: $projectId) {
      settings {
        server {
          whitelist
        }
      }
    }
  }
`,C=s.gql`
  query FetchServerAddress($projectId: String!) {
    Project(projectId: $projectId) {
      settings {
        server {
          address
        }
      }
    }
  }
`,L=s.gql`
  mutation UpdateServerAddress($projectId: String!, $value: String!) {
    UpdateServerSettings(
      projectId: $projectId,
      input: {
        address: $value
      }
    ) {
      server {
        address
      }
    }
  }
`,W=s.gql`
  mutation UpdateOnlineMode(
    $projectId: String!
    $value: Boolean!
  ) {
    UpdateServerSettings(
      projectId: $projectId,
      input: {
        onlineMode: $value
      }
    ) {
      server {
        onlineMode
      }
    }
  }
`,_=s.gql`
  mutation UpdateWhitelist(
    $projectId: String!
    $value: Boolean!
  ) {
    UpdateServerSettings(
      projectId: $projectId,
      input: {
        whitelist: $value
      }
    ) {
      server {
        whitelist
      }
    }
  }
`,O=s.gql`
  mutation TogglePlayersWidget(
    $dashboardId: String!
    $value: Boolean!
  ) {
    UpdatePlayersWidget(
      dashboardId: $dashboardId,
      input: {
        enabled: $value
      }
    ) {
      widgets {
        __typename
        ...on PlayersWidget {
          enabled
        }
      }
    }
  }
`,k=s.gql`
  mutation ToggleControlsWidget(
    $dashboardId: String!
    $value: Boolean!
  ) {
    UpdateControlsWidget(
      dashboardId: $dashboardId,
      input: {
        enabled: $value
      }
    ) {
      widgets {
        __typename
        ...on ControlsWidget {
          enabled
        }
      }
    }
  }
`,U=s.gql`
  mutation ToggleConsoleWidget(
    $dashboardId: String!
    $value: Boolean!
  ) {
    UpdateConsoleWidget(
      dashboardId: $dashboardId,
      input: {
        enabled: $value
      }
    ) {
      widgets {
        __typename
        ...on ConsoleWidget {
          enabled
        }
      }
    }
  }
`,N=s.gql`
  mutation ToggleLogsWidget(
    $dashboardId: String!
    $value: Boolean!
  ) {
    UpdateLogsWidget(
      dashboardId: $dashboardId,
      input: {
        enabled: $value
      }
    ) {
      widgets {
        __typename
        ...on LogsWidget {
          enabled
        }
      }
    }
  }
`,E=s.gql`
  mutation DeleteProject($projectId: String!) {
    DeleteProject(projectId: $projectId) {
      _id
    }
  }
`,x=s.gql`
  subscription CurrentWorkerState(
    $projectId: String!
    $token: String!  
  ) {
    CurrentWorkerState(
      projectId: $projectId
      token: $token
    ) {
      state
    }
  }
`;const T=function(){const{subscribe:e,update:t}=u({loaded:!1,list:[]});return{subscribe:e,clear(){t((e=>(e.loaded=!1,e.list=[],e)))},fetch:async()=>new Promise(((e,r)=>{j.query(m).subscribe((o=>{var a,n;o.loading||(o.error?(console.error("graphql profileprojects query error",o.error),r({error:!0})):(n=null==(a=o.data)?void 0:a.ProfileProjects,t((e=>(e.loaded=!0,e.list=n,e))),e(o)))})),j.query(m).refetch()}))}}();const D=function(){const{subscribe:e,update:t}=u({loaded:!1,project:{},state:{}});function r(e){t((t=>(t.loaded=!0,t.project=e,t)))}return{subscribe:e,async clear(){r({})},fetch:async e=>new Promise(((t,o)=>{j.query($,{variables:{projectId:e}}).subscribe((e=>{var a;e.loading||(e.error?(console.error("graphql project query error",e.error),o({error:!0})):(r(null==(a=e.data)?void 0:a.Project),t(e)))}))}))}}();const G=function(){const{subscribe:e,update:s}=u({widgets:[]});function d(e){return new Promise(((d,c)=>{const l=j.query(S,{variables:{projectId:e}});l.refetch(),l.subscribe((l=>{var p,u;l.loading||(l.error?(console.error("graphql project query error",l.error),c({error:!0})):(u=((e,t)=>{for(var r in t||(t={}))a.call(t,r)&&i(e,r,t[r]);if(o)for(var r of o(t))n.call(t,r)&&i(e,r,t[r]);return e})({},l.data.CurrentProjectDashboard),p=t(u,r({projectId:e})),s((e=>{var t;return e._id=p._id,e.projectId=null!=(t=p.projectId)?t:e.projectId,e.widgets=p.widgets,e})),d(l)))}))}))}return{subscribe:e,async refetch(){console.log("refetch");const t=await new Promise((t=>{e((e=>{t(e)}))}));return console.log(t),await d(String(t.projectId))},fetch:async e=>(console.log("fetch dashboard"),await d(e)),updateLayout:async(e,t)=>(await j.mutate(f,{variables:{dashboardId:e,input:{widgets:t.map((e=>({type:e.type,x:e.x,y:e.y,width:e.width,height:e.height})))}}})).data.UpdateProjectDashboard}}(),R=[{id:"basic",title:"Базовое",description:"Банальные и обычные страницы"},{id:"project",title:"Проект",description:"Все страницы, связанные с текущим проектом"}],M=[{url:"/app/selector",regex:/\/app\/selector/,checkName:"projectSelector",category:"basic",icon:"list",iconColor:"#818cf8",title:"Выбрать сервер",description:"Перейти к списку существующих серверов"},{url:"/app/create",regex:/\/app\/create\/[\s\S]+/,checkName:"createProject",category:"basic",icon:"layers",title:"Создать сервер",description:"Создать новый сервер"},{url:"/app/${ $page.params.projectId }/dashboard",regex:/\/app\/[\s\S]{24}\/dashboard/,checkName:"currentProject",category:"project",icon:"home",iconColor:"#34d399",title:"Главная",description:"Вся самая важная информация о текущем сервере"},{url:"/app/${ $page.params.projectId }/editor",regex:/\/app\/[\s\S]{24}\/editor\/[\s\S]+/,checkName:"currentProject",category:"project",icon:"code",iconColor:"#f472b6",title:"Редактор",description:"Создавайте и редактируйте свои плагины"},{url:"/app/${ $page.params.projectId }/worlds",regex:/\/app\/[\s\S]{24}\/worlds/,checkName:"currentProject",category:"project",icon:"archive",title:"Миры",description:"Настройки всех доступных на сервере миров"},{url:"/app/${ $page.params.projectId }/settings",regex:/\/app\/[\s\S]{24}\/settings\/[\s\S]+/,checkName:"currentProject",category:"project",icon:"settings",title:"Настройки",description:"Глобальные настройки всего сервера и проекта"}];var B,A;function Y(e){let t;switch(e){case"PLAYERS":t=O;break;case"CONSOLE":t=U;break;case"CONTROLS":t=k;break;case"LOGS":t=N}if(null!=t)return function(e){return new Promise((async r=>{const o=await new Promise((e=>{G.subscribe((async({_id:t})=>{e(t)}))()}));await j.mutate(t,{variables:{dashboardId:o,value:!e.enabled}}),G.refetch(),r(!e.enabled)}))}}function F(e){return function(){return new Promise((t=>{G.subscribe((r=>{var o,a;const n=(null!=(o=r.widgets)?o:[]).find((t=>t.type==e));null!=n&&t(null!=(a=n.enabled)&&a)}))}))}}(A=B||(B={})).TOGGLER="TOGGLER",A.INPUT="INPUT";const H={isEnabled:F("PLAYERS")},z={enable:Y("PLAYERS")},J={isEnabled:F("CONTROLS")},K={enable:Y("CONTROLS")},Q={isEnabled:F("CONSOLE")},V={enable:Y("CONSOLE")},X={isEnabled:F("LOGS")},Z={enable:Y("LOGS")},ee=[{type:B.TOGGLER,title:"Онлайн-режим",description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, a.",icon:"rss",color:"#fbbf24",updater:async function(e){return new Promise((t=>{D.subscribe((async({project:r})=>{const o=await j.mutate(W,{variables:{projectId:r._id,value:!e.enabled}});t(o.data.UpdateServerSettings.server.onlineMode)}))}))},getter:async function(){return new Promise((e=>{D.subscribe((({project:t})=>{const r=t._id;r&&j.query(w,{variables:{projectId:r}}).subscribe((t=>{var r,o,a;t.loading||(t.error?console.log("error while making request"):e(null!=(a=null==(o=null==(r=t.data)?void 0:r.Project)?void 0:o.settings.server.onlineMode)&&a))}))}))}))}},{type:B.TOGGLER,title:"Вайтлист",description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, a.",icon:"shield",color:"#3b82f6",updater:function(e){return new Promise((t=>{D.subscribe((async({project:r})=>{const o=await j.mutate(_,{variables:{projectId:r._id,value:!e.enabled}});t(o.data.UpdateServerSettings.server.whitelist)}))}))},getter:async function(){return new Promise((e=>{D.subscribe((({project:t})=>{const r=t._id;r&&j.query(q,{variables:{projectId:r}}).subscribe((t=>{var r,o,a;t.loading||(t.error?console.log("error while making request"):e(null!=(a=null==(o=null==(r=t.data)?void 0:r.Project)?void 0:o.settings.server.whitelist)&&a))}))}))}))}},{type:B.INPUT,title:"Публичный адресс",description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, a.",icon:"globe",color:"#10b981",textPlaceholder:"Публичный адресс",placeholder:{side:"right",text:".bluk.studio"},footerText:'Принимаются только <span class="bg-gray-300 rounded-full px-1.5 py-0.5">Английские буквы</span> максимум <span class="bg-gray-300 rounded-full px-1.5 py-0.5">20 букв</span>',updater:async function(e){return new Promise((t=>{D.subscribe((async({project:r})=>{const o=await j.mutate(L,{variables:{projectId:r._id,value:e.value}});t(o.data.UpdateServerSettings.server.address)}))}))},getter:async function(){return new Promise((e=>{D.subscribe((({project:t})=>{const r=t._id;r&&j.query(C,{variables:{projectId:r}}).subscribe((t=>{var r,o,a;t.loading||(t.error?console.log("error while making request"):e(null!=(a=null==(o=null==(r=t.data)?void 0:r.Project)?void 0:o.settings.server.address)?a:""))}))}))}))}}];const te=function(){const{subscribe:e,update:t}=u({list:[]});let r=[],o={current:{},state:{}};function a(){let e=[];var a;M.forEach((t=>{var a;"projectSelector"==t.checkName?(null==r?void 0:r.length)>0&&e.push(t):("createProject"==t.checkName||"currentProject"==t.checkName&&null!=(null==(a=null==o?void 0:o.current)?void 0:a._id))&&e.push(t)})),a=e,t((e=>(e.list=a,e)))}return T.subscribe((e=>{var t;r=null!=(t=null==e?void 0:e.list)?t:[],a()})),D.subscribe((e=>{e.loaded&&(o.current=e.project,a())})),{subscribe:e}}();export{te as A,R as C,E as D,B as E,I as F,ee as G,h as L,M as P,x as S,D as a,T as b,j as c,y as d,G as e,Q as f,V as g,J as h,K as i,X as j,Z as k,H as l,z as m};
