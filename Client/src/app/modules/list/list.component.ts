import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GithubDataService } from 'src/app/services/github-data.service';
import { RepoNode } from 'src/app/services/models/repo.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  title = 'Public repositories'
  list!: RepoNode[];
  private fullList!: RepoNode[];
  searchForm = this.fb.group(
    {
      search:['',[Validators.minLength(3)]]
    }
  )
  private perPage = 4;
  private page:number;
  private initSub!:Subscription;
  private searchSub!:Subscription;

  constructor(private fb: FormBuilder, private gds: GithubDataService) {
    this.page=1
  }

  ngOnInit(): void {
    this.getAllRepositories()
  }

  getAllRepositories(){
    this.initSub = this.gds.getAll()
    .pipe(tap(console.log))
    .subscribe(
      result=>{
        this.fullList=result;
        this.sliceList()
      }
    )
  }

  sliceList(){
    const start = 0
    const stop = this.page*this.perPage
    this.list = this.fullList.slice(start, stop)
  }

  get search(){
    return this.searchForm.controls.search
  }

  onSearch(){
    const searchTxt = this.search.value;
    if(this.searchForm.valid===true){
      this.searchSub = this.gds.getSearchResult(searchTxt)
      .subscribe(result=>{
          this.fullList=result
          this.sliceList()
        }
      )
    }
  }

  loadMore(){
    this.page++;
    this.sliceList()
  }

  ngOnDestroy(): void {
      this.initSub.unsubscribe()
      if(this.searchSub)
      this.searchSub.unsubscribe()
  }

}
