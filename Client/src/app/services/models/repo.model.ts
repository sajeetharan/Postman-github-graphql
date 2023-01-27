export interface Repo {
  search:{
    edges: RepoNode[]
  }
}

export interface RepoNode{
  node:{
    "id": string,
    "databaseId": number,
    "name": string,
    "nameWithOwner": string,
    "url": string,
    "description": string, 
  }     
}