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
          location.reload();  // Reload the page to reflect changes
        },
        error: function(error) {
          alert(error.responseJSON.error);
        }
      });
    });
});

document.getElementById('addNoteBtn').addEventListener('click', function() {
  var noteContent = document.getElementById('note').value;
  var category = document.getElementById('category').value;
  var data = {
    note: noteContent,
    category: category
  };

  fetch('/add-note', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.message); // Handle response from the server
    if (data.message === 'Note added successfully') {
      // Zatvori modal
      $('#addNoteModal').modal('hide');

      // Resetuj formu
      document.getElementById('note').value = '';
      document.getElementById('category').value = '';

      // Dodaj novu belešku na listu
      var notesList = document.getElementById('notes');
      var newNoteItem = document.createElement('li');
      newNoteItem.className = 'list-group-item';
      newNoteItem.innerHTML = '<div class="element-liste"><span>' + noteContent + '</span><button type="button" class="btn btn-sm btn-primary edit-btn edit-dugme"  data-toggle="modal" data-target="#editModal" data-noteid="' + data.note_id + '">Edit</button><button type="button" class="close delete-dugme" aria-label="Close" onClick="deleteNote(\'' + data.note_id + '\')"><span aria-hidden="true">&times;</span></button></div>';
      notesList.appendChild(newNoteItem);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});



