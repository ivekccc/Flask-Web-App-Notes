function deleteNote(noteId) {
    fetch("/delete-note", {
      method: "POST",
      body: JSON.stringify({ noteId: noteId }),
    }).then((_res) => {
      window.location.href = "/";
    });
  }

  $(document).ready(function() {
    $('.edit-btn').click(function() {
      var noteId = $(this).data('noteid');
      var noteContent = $(this).siblings('span').text();
      $('#editModal').data('noteid', noteId);
      $('#editNoteContent').val(noteContent);
    });

    $('#saveChangesBtn').click(function() {
      var noteId = $('#editModal').data('noteid');
      var newContent = $('#editNoteContent').val();
      $.ajax({
        type: 'POST',
        url: '/edit-note',
        contentType: 'application/json',
        data: JSON.stringify({ noteId: noteId, newContent: newContent }),
        success: function(response) {
          alert(response.message);
          $('#editModal').modal('hide');
          location.reload();
        },
        error: function(error) {
          alert(error.responseJSON.error);
        }
      });
    });
  });

