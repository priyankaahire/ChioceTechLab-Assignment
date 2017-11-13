import { Component, OnInit } from '@angular/core';
import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { FormsModule }    from '@angular/forms';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    user: User;
    users: User;
    currentUserId: number;
  /**
   *
   * @param userService
   */
    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    
    ngOnInit() {
       this.getProfile(this.currentUser.id);
       this.loadAllUsers();
    }
    /**
     * 
     * @param id 
     */
    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.getProfile(this.currentUserId)});
    }
    /**
     * loadAllUsers
     */
    private loadAllUsers() {
        this.userService.getAll().subscribe(users => 
            { this.users = users; 
            });
    }
    /**
     * getProfile(id)
     * @param id 
     */
    private getProfile(id: number) {
        this.userService.getById(this.currentUser.id).subscribe(user => 
            { this.user = user; 
            });
    }
}