$(document).ready(function(){

	// Get the categories and create the checkboxes in the new item form
	$.ajax({
		type: 'GET',
		url: 'get_categories.php',
		dataType: 'json',
		success: function(data){
			$.each(data, function(i, category){
				$('#new-item form .item-categories').append('<label class="item-category"><input type="checkbox" name="category[]" value="' + category['id'] + '">' + category['name'] + '</label>');
			});
		},
		error: function(e){
			alert('Error: Failed to load categories:');
			console.error(e);
		}
	});

	// Get the inventory items and create the list
	$.ajax({
		type: 'GET',
		url: 'get_inventory.php',
		data: {
			'td': td
		},
		dataType: 'json',
		success: function(data){
			$.each(data, function(i, item){
				var output = '<div class="item">';
				output += '<button class="item-delete" onclick="deleteItem(' + item['id'] + ');">&cross;</button>';
				output += '<a href="../resources/item_images/' + item['id'] + '.jpg" target="_blank"><img class="item-image" src="../resources/item_images/thumbnail/' + item['id'] + '.jpg" width="240" height="135"></a>';
				output += '<div class="item-information">';
				output += '<h3 class="item-title">' + item['title'] + '</h3>';
				output += '<div class="item-categories">';
				$.each(item['categories'], function(ic, category){
					output += '<div class="item-category">' + category + '</div>';
				});
				output += '</div>';
				output += '</div>';
				output += '<p class="item-description">' + item['description'] + '</p>';
				output += '</div>';
				$('#inventory').append(output);
			});
		},
		error: function(e){
			alert('Error: Failed to load inventory data');
			console.error('Failed to load inventory data:');
			console.error(e);
		}
	});

	// Get the previous inventory items and add them to the list
	$.ajax({
		type: 'GET',
		url: 'get_inventory.php',
		data: {
			'td': td,
			'deleted': null
		},
		dataType: 'json',
		success: function(data){
			$.each(data, function(i, item){
				var output = '<div class="item item-deleted">';
				output += '<a href="../resources/item_images/' + item['id'] + '.jpg" target="_blank"><img class="item-image" src="../resources/item_images/thumbnail/' + item['id'] + '.jpg" width="240" height="135"></a>';
				output += '<div class="item-information">';
				output += '<h3 class="item-title">' + item['title'] + '</h3>';
				output += '<div class="item-categories">';
				$.each(item['categories'], function(ic, category){
					output += '<div class="item-category">' + category + '</div>';
				});
				output += '</div>';
				output += '</div>';
				output += '<p class="item-description">' + item['description'] + '</p>';
				output += '</div>';
				$('#inventory').append(output);
			});
		},
		error: function(e){
			alert('Error: Failed to load deleted inventory data');
			console.error('Failed to load deleted inventory data');
			console.error(e);
		}
	});

});

// Mark an item as claimed
function deleteItem(id){
	$.ajax({
		type: 'GET',
		url: 'delete_inventory.php',
		data: {
			itemid: id
		},
		success: function(){
			location.reload();
		},
		error: function(e){
			alert('Error: Failed to delete item');
			console.error('Failed to delete item:');
			console.error(e);
		}
	});
}