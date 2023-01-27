import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GithubDataService } from 'src/app/services/github-data.service';
import { RepoNode } from 'src/app/services/models/repo.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  id!:string;
  repo!:RepoNode;
  private sub!: Subscription;

  constructor(private route: ActivatedRoute, private gds: GithubDataService) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.gds.getOne(this.id).subscribe(result=>this.repo=result)
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
