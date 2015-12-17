var noteTemplate_notStarred = _.template(
  "<p class='note-id'><%= id %></p>" +
  "<p class='note-title'><%= title %></p>" +
  "<p>Create Time: <span class='note-create-time'><%= create_time %></span></p>" +
  // "<p>Modified Time: <%= modify_time %></p>" +
  // "<p>Reminder: <%= remind_info %></p>" +
  // "<p>Attachment: <%= attachment_path %></p>" +
  "<span class='glyphicons glyphicons-star-empty'>is star</span>" +
  "<p class='note-star' hidden>star</p>" +
  "<p class='note-content'><%= contents %></p>"
);


var noteTemplate_starred = _.template(
  "<p class='note-id'><%= id %></p>" +
  "<p class='note-title'><%= title %></p>" +
  "<p>Create Time: <span class='note-create-time'><%= create_time %></span></p>" +
  // "<p>Modified Time: <%= modify_time %></p>" +
  // "<p>Reminder: <%= remind_info %></p>" +
  // "<p>Attachment: <%= attachment_path %></p>" +
  "<span class='glyphicons glyphicons-star'>not star</span>" +
  "<p class='note-star' hidden>not star</p>" +
  "<p class='note-content'><%= contents %></p>"
);
