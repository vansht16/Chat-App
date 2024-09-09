import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-group-chat',
  templateUrl: './group-chat.component.html',
  styleUrls: ['./group-chat.component.css']
})
export class GroupChatComponent implements OnInit {
  currGroup: any;
  messages: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const groupId = this.route.snapshot.paramMap.get('groupId');
    this.currGroup = this.groupService.getGroupDetailsById(groupId);
  }

  sendMessage(message: string): void {
    if (message.trim()) {
      this.messages.push(message);
    }
  }

  leaveGroup(): void {
    this.groupService.leaveGroup(this.currGroup.id); // Remove user from group
    this.router.navigate(['/dashboard']); // Redirect to the dashboard
  }
}
