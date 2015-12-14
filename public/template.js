var noteTemplate_notStarred = _.template(
  "<h3><%= title%></h3>" +
  "<p>Create Time: <%= create_time %></p>" +
  "<p>Modified Time: <%= modify_time %></p>" +
  "<p>Reminder: <%= remind_info %></p>" +
  "<p>Attachment: <%= attachment_path %></p>" +
  "<span class='glyphicons glyphicons-star-empty'></span>" +
  "<p><%= contents %></p>"
);


var noteTemplate_starred = _.template(
  "<h3><%= title%></h3>" +
  "<p>Create Time: <%= create_time %></p>" +
  "<p>Modified Time: <%= modify_time %></p>" +
  "<p>Reminder: <%= remind_info %></p>" +
  "<p>Attachment: <%= attachment_path %></p>" +
  "<span class='glyphicons glyphicons-star'></span>" +
  "<p><%= contents %></p>"
);
