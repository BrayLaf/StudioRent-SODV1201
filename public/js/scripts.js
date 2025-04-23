$(function () {
        
        function updateStudios(category) {
          let grid = $("#mostViewedGrid");
          grid.empty();
      
          studioData[category].forEach((studio) => {
            grid.append(`
              <div class="mostViewedCard">
                <img src="${studio.img}" alt="mostViewed">
                <span>Featured</span>
              </div>
            `);
          });
        }
      
        
        $(".studio-filter a").click(function (e) {
          e.preventDefault();
      
          $(".studio-filter a").removeClass("active");
          $(this).addClass("active");
      
          let category = $(this).data("category");
          updateStudios(category);
        });
      
        updateStudios("recording");
});
