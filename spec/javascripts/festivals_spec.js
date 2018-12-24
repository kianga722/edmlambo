describe('festivals', function() {
  //Create HTML with top tab nav, 2 fesetival events
  beforeAll(function() {
    history.pushState(null, '', '/festivals');
    let page = document.createElement('div');
    page.innerHTML = `
      <section id='festivals-wrapper'>
        <div class='festival-list'>

          <div class='month'>
            December
          </div>

          <div class='festival'>
            <div class='dates-info-wrapper'>

              <div class='dates-wrapper'>   
                <div class='festival-pic-wrapper'>
                  <div class='festival-pic'>
                  </div>
                </div>

                <div class='festival-dates'>
                  <div>
                    Dec 27
                  </div>
                  <div>
                    Dec 28
                  </div>
                </div>
              </div>

              <div class='festival-info'>
                <div class='festival-title'>
                  Get Together
                </div>

                <div class='festival-details'>
                  <span>
                    Edmonton, AB
                  </span>
                  
                    <span class='festival-ages'>
                      18+
                    </span>
                </div>
              </div>

            </div>

            <div class='arrow-link arrow'></div>

            <form class='favorite-wrapper hide' action='/events' method='new' data-remote='true'>
              <input type='hidden' name='eventID' value='289'>
              <input type='submit' class='favorite' value=''>
            </form>

            <div class='festival-more hide'>

              <div class='festival-links'>
                <a href='https://edmtrain.com/alberta?event=95150&amp;tickets' target='_blank' rel='noopener noreferrer' class='festival-website'>
                  Event Website
                </a
                ><a href='https://maps.google.com/?q=9797 Jasper Ave, Edmonton, AB T5J 1N9, Canada' target='_blank' rel='noopener noreferrer' class='festival-map'>
                  Venue Map
                </a>
              </div>

              <div class='hotel-links'>
                <a class='airbnb-link'>
                  Hotels & Airbnbs
                </a
                ><a class='airbnb-share'>
                  <span class='shareIcon'></span>
                  Share
                </a>
              </div>

            </div>            
          </div>

          <div class='festival'>
            <div class='dates-info-wrapper'>

              <div class='dates-wrapper'>
                
                <div class='festival-pic-wrapper'>
                  <div class='festival-pic'>
                  </div>
                </div>

                <div class='festival-dates'>
                  <div>
                    Dec 28
                  </div>
                  <div>
                    Dec 29
                  </div>
                </div>

              </div>

              <div class='festival-info'>
                <div class='festival-title'>
                  Lights All Night
                </div>

                <div class='festival-details'>
                  <span>
                    Dallas, TX
                  </span>
                  
                </div>
              </div>
          
            </div>

            <div class='arrow-link arrow'></div>

            <form class='favorite-wrapper hide' action='/events' method='new' data-remote='true'>
              <input type='hidden' name='eventID' value='334'>
              <input type='submit' class='favorite' value=''>
            </form>
 
            <div class='festival-more hide'>

              <div class='festival-links'>
                <a href='https://edmtrain.com/texas?event=79909&amp;tickets' target='_blank' rel='noopener noreferrer' class='festival-website'>
                  Event Website
                </a
                ><a href='https://maps.google.com/?q=2200 N Stemmons Fwy, Dallas, TX 75207, USA' target='_blank' rel='noopener noreferrer' class='festival-map'>
                  Venue Map
                </a>
              </div>

              <div class='hotel-links'>
                <a class='airbnb-link'>
                  Hotels & Airbnbs
                </a
                ><a class='airbnb-share'>
                  <span class='shareIcon'></span>
                  Share
                </a>
              </div>

            </div>            
            
          </div>

        </div>
      </section>
    `;
    document.body.appendChild(page);
  });

  it('festival event expands', function() {
    let ev1 = document.querySelector('.festival-list').children[1];
    let ev2 = document.querySelector('.festival-list').children[2];
    expect(ev1.children[3].classList).toContain('hide');
    expect(ev2.children[3].classList).toContain('hide');
    festivalsLogic.festivalExpand({target: ev1}, 'festival');
    expect(ev1.children[3].classList).not.toContain('hide');
    expect(ev2.children[3].classList).toContain('hide');
    festivalsLogic.festivalExpand({target: ev2}, 'festival');
    expect(ev1.children[3].classList).toContain('hide');
    expect(ev2.children[3].classList).not.toContain('hide');
  });


})