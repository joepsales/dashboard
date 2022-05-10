import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { Post } from '../post.model';
import { PostsService } from "../posts.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  @Input() posts: Post[] = [];
  private postsSub: Subscription | undefined;

  constructor(public postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        console.log(this.posts);
      });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  onFacebookPost(post: Post){
    this.postsService.publishPost(post);
  }

  ngOnDestroy() {
    this.postsSub?.unsubscribe();
  }

}
