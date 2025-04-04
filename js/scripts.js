$(function () {

      //sample studio data - to be filled in future
        const studioData = {
          recording: [
            { img: "/assets-images/studio 2/interior2.1.jpg" },
            { img: "/assets-images/studio 3/interior3.2.jpg" },
            { img: "/assets-images/studio 2/interior2.2.jpg" },
            { img: "/assets-images/studio 1/interior1.4.jpg" },
            { img: "/assets-images/studio 1/interior1.2.jpg" },
            { img: "/assets-images/studio 3/interior3.4.jpg" },
          ],
          photography: [
            { img: "/assets-images/studio 3/exterior3.4.jpg" },
            { img: "/assets-images/studio 2/exterior1.2.jpg" },
            { img: "/assets-images/studio 2/interior2.3.jpg" },
            { img: "/assets-images/studio 3/exterior4.1.jpg" },
            { img: "/assets-images/studio 3/interior3.1.jpg" },
            { img: "/assets-images/studio 2/interior2.1.jpg" },
          ],
          film: [
            { img: "/assets-images/studio 2/interior2.1.jpg" },
            { img: "/assets-images/studio 3/interior1.2.jpg" },
            { img: "/assets-images/studio 2/interior3.2.jpg" },
            { img: "/assets-images/studio 1/interior1.4.jpg" },
            { img: "/assets-images/studio 1/interior2.2.jpg" },
            { img: "/assets-images/studio 3/interior3.4.jpg" },
          ],
          podcast: [
            { img: "/assets-images/studio 2/interior2.3.jpg" },
            { img: "/assets-images/studio 3/interior3.4.jpg" },
            { img: "/assets-images/studio 2/interior2.5.jpg" },
            { img: "/assets-images/studio 1/interior1.3.jpg" },
            { img: "/assets-images/studio 1/interior1.2.jpg" },
            { img: "/assets-images/studio 3/interior3.1.jpg" },
          ],
        };
        
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
