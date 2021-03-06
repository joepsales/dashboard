import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.model";

import { PostsService } from "../posts.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  private mode = 'create';
  private postId: string | null = '';
  post: Post = {
    id: "",
    title: "",
    location: ""
  };
  isLoading = false;

  constructor(public postsService: PostsService, public route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId!).subscribe(postData => {
          this.isLoading = false;
          this.post = { id: postData._id, title: postData.title, location: postData.location };
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      this.toastr.error('Post created unsuccessfully.', 'Error', {
        progressAnimation: "increasing",
        progressBar: true
      })
        return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
        this.postsService.addPost(form.value.title, form.value.location);
        console.log(form.value.title + " " + form.value.location);
        this.toastr.success('Form validated.', 'Success', {
          progressAnimation: "increasing",
          progressBar: true
        });
    } else {
        this.postsService.updatePost(
            this.postId!, 
            form.value.title, 
            form.value.location
        );
        
    }
    form.resetForm();
}

}
