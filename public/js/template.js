var noteTemplate_notStarred = _.template(
  "<p class='note-id' hidden><%= id %></p>" +
  "<p class='note-title'><%= title %></p>" +
  "<p>Create Time: <span class='note-create-time'><%= create_time %></span></p>" +
  "<p>Modify Time: <span class='note-modify-time'><%= modify_time %></span></p>" +
  // "<p>Modified Time: <%= modify_time %></p>" +
  // "<p>Reminder: <%= remind_info %></p>" +
  // "<p>Attachment: <%= attachment_path %></p>" +
  "<p class='note-star' hidden>not star</p>" +
  "<p class='note-content'><%= contents %></p>"
);


var noteTemplate_starred = _.template(
  "<p class='note-id' hidden><%= id %></p>" +
  "<p class='note-title'><%= title %></p>" +
  "<p>Create Time: <span class='note-create-time'><%= create_time %></span></p>" +
  "<p>Modify Time: <span class='note-modify-time'><%= modify_time %></span></p>" +
  // "<p>Modified Time: <%= modify_time %></p>" +
  // "<p>Reminder: <%= remind_info %></p>" +
  // "<p>Attachment: <%= attachment_path %></p>" +
  "<p class='note-star' hidden>starred</p>" +
  "<p class='note-content'><%= contents %></p>"
);
