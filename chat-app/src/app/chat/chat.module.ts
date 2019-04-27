import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatFormComponent } from './components/chat-form/chat-form.component';
import { FeedComponent } from './components/feed/feed.component';
import { MessageComponent } from './components/message/message.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { SharedModule } from '../shared/modules/shared.module';
import { MedicineListComponent } from './components/medicine-list/medicine-list.component';
import { ImportModule } from '../shared/modules/import.module';

@NgModule({
  declarations: [
    ChatListComponent,
    ChatFormComponent,
    FeedComponent,
    MessageComponent,
    UserListComponent,
    UserItemComponent,
    ChatroomComponent,
    MedicineListComponent
  ],
  imports: [CommonModule, ImportModule, SharedModule]
})
export class ChatModule {}
