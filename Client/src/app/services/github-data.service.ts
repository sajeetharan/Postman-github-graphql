import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Repo, RepoNode } from './models/repo.model';
import { gql } from 'apollo-angular';
import { Apollo } from 'apollo-angular'

const searchQuery = gql<Repo,{}>`
query searchRepos($queryString: String!) {
  search(query: $queryString, type: REPOSITORY, first: 100) {
    repositoryCount
    edges {
      node {
        ... on Repository {
          id
          name
          nameWithOwner
          description
          url
        }
      }
    }
  }
}
`

const getByIdQuery = gql<RepoNode,{}>`
query getRepo($id: ID!){ 
  node(id: $id){
    ... on Repository {
      id
      name
      nameWithOwner
      description
      url
    }
  }
}`

@Injectable({
  providedIn: 'root'
})
export class GithubDataService {

  constructor(private apollo:Apollo) { }

  getAll(){
    return this.apollo
      .query({
        query: searchQuery,
        variables:{
          queryString:'is:public'
        }
        
      })
      .pipe(
        map(res=>res.data.search.edges),
      )
  }

  getSearchResult(text:string){
    return this.apollo
      .query({
        query: searchQuery,
        variables:{
          queryString:`${text} in:name is:public`
        }
        
      })
      .pipe(
        map(res=>res.data.search.edges),
      )
  }

  getOne(id:string){
    return this.apollo
      .query({
        query: getByIdQuery,
        variables:{
          id:id
        }
        
      })
      .pipe(
        map(res=>res.data),
      )
  }
}
