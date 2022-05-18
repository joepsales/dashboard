import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Post } from "./post.model";
import { FbPost } from './FbPost.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private fbPosts: FbPost[] = [];
  private postsUpdated = new Subject<Post[]>();
  private fbPostsUpdated = new Subject<FbPost[]>();

  constructor(private http: HttpClient, private router: Router) { }

  // Create Post
  addPost(title: string, location: string) {
    const post: Post = { id: null!, title: title, location: location };
    this.http.post<{ message: string, postId: string }>('http://localhost:3000/posts', post)
      .subscribe((responseData) => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        //this.router.navigate(["/"]);
        window.location.reload();
      });
  }

  publishPost(post: Post){
    const fbPost: FbPost = { content: post.title };
    this.http.post<any>('http://localhost:3000/posts/facebook', { content: fbPost.content })
      .subscribe(data => {
        fbPost.content = data.content;
      });
  }

    // Create Facebook Post
    addFacebookPost(content: string) {
      const fbPost: FbPost = { content: content };
      this.http.post<any>('http://localhost:3000/posts/facebook', { content: fbPost.content })
      .subscribe(data => {
        fbPost.content = data.content;
      });
        // .subscribe((responseData) => {
        //   post.content = content
        //   console.log(post.content);
        //   this.fbPosts.push(post);
        //   this.fbPostsUpdated.next([...this.fbPosts]);
        //   //this.router.navigate(["/"]);
        //   window.location.reload();
        // });
    }

  // Get All Posts
  getPosts() {
    this.http.get<{ message: string, posts: any }>('http://localhost:3000/posts')
      .pipe(map((postData) => {
        return postData.posts.map((post: { title: any; location: any; _id: any; }) => {
          return {
            title: post.title,
            location: post.location,
            id: post._id
          }
        });
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  // Get Post By ID
  getPost(id: string) {
    return this.http.get<{ _id: string, title: string, location: string }>("http://localhost:3000/posts/" + id);
  }

  // Update Post By ID
  updatePost(id: string, title: string, location: string) {
    const post: Post = { id: id, title: title, location: location };
    this.http.put('http://localhost:3000/posts/' + id, post)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        //this.router.navigate(["/"]);
      });
  }

  // Delete Post By ID
  deletePost(postId: string) {
    this.http.delete("http://localhost:3000/posts/" + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        window.location.reload();
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }
}
