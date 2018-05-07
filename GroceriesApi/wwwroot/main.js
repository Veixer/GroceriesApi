const uri = 'api/groceries';
let groceries = null;

function getGroceryCount(data) {
    const el = $('#groceryCounter');
    let name = 'Groceries:';
    if (data) {
        el.text(name + ' ' + data);
    } else {
        el.html('No groceries added');
    }
}

$(document).ready(function () {
    getData();
});

function getData() {
    $.ajax({
        type: 'GET',
        url: uri,
        success: function (data) {
            $('#groceries').empty();
            getGroceryCount(data.length);
            $.each(data, function (key, item) {
                $('<tr><td>' + item.name + '</td>>' +
                    '<td>' + item.size + '</td>' +
                    '<td>' + item.amount + '</td>' +
                    '<td><button onclick="editItem(' + item.id + ')">Edit</button></td>' +
                    '<td><button onclick="deleteItem(' + item.id + ')">Delete</button></td>' +
                    '</tr>').appendTo($('#groceries'));
            });

            groceries = data;
        }
    });
}

function addItem() {
    const item = {
        'name': $('#add-name').val(),
        'size': $('#add-size').val(),
        'amount': $('#add-amount').val()
    };

    $.ajax({
        type: 'POST',
        accepts: 'application/json',
        url: uri,
        contentType: 'application/json',
        data: JSON.stringify(item),
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Error');
        },
        success: function (result) {
            getData();
            $('#add-name').val('');
            $('#add-size').val('');
            $('#add-amount').val('');
        }
    });
}

function deleteItem(id) {
    $.ajax({
        url: uri + '/' + id,
        type: 'DELETE',
        success: function (result) {
            getData();
        }
    });
}

function editItem(id) {
    $.each(groceries, function (key, item) {
        if (item.id === id) {
            $('#edit-name').val(item.name);
            $('#edit-size').val(item.size);
            $('#edit-amount').val(item.amount);
            $('#edit-id').val(item.id);
        }
    });
    $('#edit-div').css({ 'display': 'block' });
}

$('.edit-form').on('submit', function () {
    const item = {
        'name': $('#edit-name').val(),
        'size': $('#edit-size').val(),
        'amount': $('#edit-amount').val(),
        'id': $('#edit-id').val()
    };

    $.ajax({
        url: uri + '/' + $('#edit-id').val(),
        type: 'PUT',
        accepts: 'application/json',
        contentType: 'application/json',
        data: JSON.stringify(item),
        success: function (result) {
            getData();
        }
    });

    closeInput();
    return false;
});


function closeInput() {
    $('#edit-div').css({ 'display': 'none' });
}

