import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { FeedComponent } from './feed/feed.component';
import { MessageComponent } from './message/message.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserItemComponent } from './user-item/user-item.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { SharedModule } from '../shared/shared.module';
import { ImportModule } from '../shared/import/import.module';

@NgModule({
  declarations: [
    ChatListComponent,
    ChatFormComponent,
    FeedComponent,
    MessageComponent,
    UserListComponent,
    UserItemComponent,
    ChatroomComponent
  ],
  imports: [CommonModule, ImportModule, SharedModule]
})
export class ChatModule {}
