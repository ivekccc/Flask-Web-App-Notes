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

      // AJAX poziv za dobijanje statusa isDone atributa
      $.ajax({
        type: 'POST',
        url: '/get-note-status',
        contentType: 'application/json',
        data: JSON.stringify({ noteId: noteId }),
        success: function(response) {
          var isDone = response.isDone; // Dobijena vrednost isDone atributa
          $('#editIsDone').prop('checked', isDone); // Postavljanje vrednosti checkbox-a
        },
        error: function(error) {
          alert(error.responseJSON.error);
        }
      });

      // AJAX poziv za dobijanje kategorije beleške
      $.ajax({
        type: 'POST',
        url: '/get-category', // Ispravljeno ime rute
        contentType: 'application/json',
        data: JSON.stringify({ noteId: noteId }),
        success: function(response) {
          var categoryId = response.categoryId; // Dobijena vrednost categoryId
          $('#editCategory').val(categoryId); // Postavljanje vrednosti u padajući meni
        },
        error: function(error) {
          alert(error.responseJSON.error);
        }
      });

      var isDone = $(this).siblings('.element-liste').find('.form-check-input').prop('checked');
      $('#editModal').data('noteid', noteId);
      $('#editNoteContent').val(noteContent);
      $('#editIsDone').prop('checked', isDone);
    });

    $('#saveChangesBtn').click(function() {
      var noteId = $('#editModal').data('noteid');
      var newContent = $('#editNoteContent').val();
      var categoryId = $('#editCategory').val(); // Dobijanje vrednosti kategorije
      var isDone = $('#editIsDone').prop('checked');
      $.ajax({
        type: 'POST',
        url: '/edit-note',
        contentType: 'application/json',
        data: JSON.stringify({ noteId: noteId, newContent: newContent, categoryId: categoryId, isDone: isDone }),
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




