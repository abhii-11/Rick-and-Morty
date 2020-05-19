//'use strict';
var completeData,
    checkboxValues = JSON.parse(localStorage.getItem('checkboxValues')) || {},
    $checkboxes = $(".js-filters :checkbox"),
    sortType = 'ascending';

var rickMortyShow = {
    
    init: function() {
        $.get("https://rickandmortyapi.com/api/character/", function(data, status){
            completeData = data.results;
            rickMortyShow.fillData();
        });
    },

    fillData: function(){
        $('.js-profiles').empty();
        completeData.map(function(person){
            if(sortType === 'ascending'){
                $('.js-profiles').append('<div class="col-xs-6 col-md-3"><div class="card"><div class="image-block"><img class="img-responsive" src="' + person.image + '" alt="Chania"><div class="main-info"><h4 class="js-name">' + person.name + '</h4><p>id:' + person.id + '- Created 2 years ago</p></div></div><div class="info-block"><div class="table-responsive"><table class="table"><tbody><tr><td><span>Status</span></td><td class="text-right"><span class="yellow">' + person.status + '</span></td></tr><tr><td><span>Species</span></td><td class="text-right"><span class="yellow js-species" data-type="' + person.species.toLowerCase() + '">' + person.species + '</span></td></tr><tr><td><span>Gender</span></td><td class="text-right"><span class="yellow js-gender" data-type="' + person.gender.toLowerCase() + '">' + person.gender + '</span></td></tr><tr><td><span>Origin</span></td><td class="text-right"><span class="yellow">' + person.origin.name + '</span></td></tr><tr><td><span>Last <br/>Location</span></td><td class="text-right"><span class="yellow">' + person.location.name + '</span></td></tr></tbody></table></div></div></div></div>');
            }else{
                $('.js-profiles').prepend('<div class="col-xs-6 col-md-3"><div class="card"><div class="image-block"><img class="img-responsive" src="' + person.image + '" alt="Chania"><div class="main-info"><h4 class="js-name">' + person.name + '</h4><p>id:' + person.id + '- Created 2 years ago</p></div></div><div class="info-block"><div class="table-responsive"><table class="table"><tbody><tr><td><span>Status</span></td><td class="text-right"><span class="yellow">' + person.status + '</span></td></tr><tr><td><span>Species</span></td><td class="text-right"><span class="yellow js-species" data-type="' + person.species.toLowerCase() + '">' + person.species + '</span></td></tr><tr><td><span>Gender</span></td><td class="text-right"><span class="yellow js-gender" data-type="' + person.gender.toLowerCase() + '">' + person.gender + '</span></td></tr><tr><td><span>Origin</span></td><td class="text-right"><span class="yellow">' + person.origin.name + '</span></td></tr><tr><td><span>Last <br/>Location</span></td><td class="text-right"><span class="yellow">' + person.location.name + '</span></td></tr></tbody></table></div></div></div></div>');
            }
        });
        this.bindUI();
    },
    
    bindUI: function() {
            this.onLoadCheckBoxHandler();
            this.checkboxClickHandler();

            $(document).on('click','.js-remove-pills',this.removePill);
            $(document).on('change',$checkboxes,this.checkboxClickHandler);
            $(document).on('keydown','.js-search-by-name',this.filterContentByName);
            $(document).on('change','.js-sort',this.sortData);
    },

    onLoadCheckBoxHandler: function() {
        // On page load
        var checkedIds = '';
        $.each(checkboxValues, function(key, value) {
            if(value){
                checkedIds += '#' + key + ',';
            }
        });
        checkedIds = checkedIds.slice(0,(checkedIds.length - 1))
        $(checkedIds).trigger('click');
    },
    checkboxClickHandler: function(){
        // On checkBox change
            $checkboxes.each(function(index){
                if(this.checked)
                    checkboxValues[this.id] = this.checked;
                else
                    delete checkboxValues[this.id];
            });
            localStorage.setItem("checkboxValues", JSON.stringify(checkboxValues));
            rickMortyShow.renderPills();
    },

    renderPills: function() {
        //alert("hey")
        var $pillsContainer = $('.js-pills-container');
        $pillsContainer.empty();
            $.each(checkboxValues, function(key, value) {
                $pillsContainer.append('<span class="pills">' + key + '<i class="glyphicon glyphicon-remove js-remove-pills" data-id="' + key + '"></i></span>');
            });
        if(!$('.js-pills-container').children().length){
            $('.js-pills-block').hide('slow');
            $('.js-profiles>div').show('slow');
        }else{
            $('.js-pills-block').show('slow');
            this.filterContentByFilters();
        }

    },
    
    removePill: function() {
        var pillId = $(this).data('id');
        $('#'+pillId).trigger('click');
    },

    filterContentByFilters: function() {
        var $card = $('.card');
        $card.parent().hide();
        $.each(checkboxValues, function(key, value) {
            $card.each(function(){
                if($(this).find('[data-type=' + key + ']').length){
                    $(this).parent().show('slow');
                }
            })
        });
    },

    filterContentByName: function() {
        $('.js-remove-pills').each(function(){
            $(this).trigger('click');
        })
        var searchTerm = $('.js-search-by-name').val().toLowerCase();
        $('.js-name').each(function(){
            var currentName = $(this).text().toLowerCase().trim();
            if(currentName.indexOf(searchTerm) >= 0){
                $(this).closest('.card').parent().show();
            }else{
                $(this).closest('.card').parent().hide();
            }
        });
    },
    
    sortData: function() {
        sortType = $(this).find(':selected').attr('data-sort-type');
        rickMortyShow.fillData();
    }

}
rickMortyShow.init();




