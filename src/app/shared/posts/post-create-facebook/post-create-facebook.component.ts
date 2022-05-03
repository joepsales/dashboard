import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FbPost } from '../FbPost.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create-facebook',
  templateUrl: './post-create-facebook.component.html',
  styleUrls: ['./post-create-facebook.component.scss']
})
export class PostCreateFacebookComponent implements OnInit {

  private mode = 'create';
  post: FbPost = {
    content: ''
  };

  constructor(public postsService: PostsService, public route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
      this.toastr.error('Form is invalid.', 'Error', {
        progressAnimation: "increasing",
        progressBar: true
      })
        return;
    }
    if (this.mode === 'create') {
        this.postsService.addFacebookPost(form.value.content);
        this.toastr.success('Post published successfully.', 'Success', {
          progressAnimation: "increasing",
          progressBar: true
        });
    }
    form.resetForm();
}

}
