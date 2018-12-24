describe('concerts', function() {
  //Create HTML with top tab nav, 2 events(1 expanded and favorited)
  beforeAll(function() {
    let page = document.createElement('div');
    page.innerHTML = `
      <nav class='tabs'>
        <a href='/' data-remote='true' class='tab-cities'>
          <span class='tab-title'>Cities</span>
        </a>
        <a href='/festivals' data-remote='true' class='tab-festivals'>
          <span class='tab-title'>Festivals</span>
        </a>
        <a href='/tours' data-remote='true'  class='tab-tours'>
          <span class='tab-title'>Tours</span>
        </a>
        <a class='logo'></a>
      </nav>

      <div class='loading-wrapper hide'></div>

      <section id='concerts-wrapper'>
        <section class='event-list'>

          <div class='recent-container'>

            <div class='recent-title'>
              Recently Added
            </div>

            <div class='recent-slider-frame'>

              <div class='recent-slider'>
                <div data-id='2236' class='event-slide'>
                  <div class='slide-bg'></div>

                  <div class='slide-date'>
                    Fri, Feb 08
                  </div>

                  <div class='slide-title'>
                    Life and Death X Sonar
                  </div>

                  <div class='slide-venue'>
                    Great Hall at Avant Gardner
                  </div>

                  <div class='slide-sep'></div>
                </div>
                <div data-id='2881' class='event-slide'>
                  <div class='slide-bg'></div>

                  <div class='slide-date'>
                    Thu, Feb 28
                  </div>

                  <div class='slide-title'>
                    PhaseOne
                  </div>

                  <div class='slide-venue'>
                    Photo City Improv
                  </div>

                  <div class='slide-sep'></div>
                </div>
                <div data-id='452' class='event-slide'>
                  <div class='slide-bg'></div>

                    <div class='slide-date'>
                      Fri, Dec 28
                    </div>

                    <div class='slide-title'>
                      Jubilee, Nasty Nigel
                    </div>

                    <div class='slide-venue'>
                      House of Yes
                    </div>

                    <div class='slide-sep'></div>
                  </div>
                <div data-id='654' class='event-slide'>
                  <div class='slide-bg'></div>

                  <div class='slide-date'>
                    Sun, Dec 30
                  </div>

                  <div class='slide-title'>
                    MANIK
                  </div>

                  <div class='slide-venue'>
                    Good Room
                  </div>

                  <div class='slide-sep'></div>
                </div>
                <div data-id='836' class='event-slide'>
                  <div class='slide-bg'></div>

                  <div class='slide-date'>
                    Mon, Dec 31
                  </div>

                  <div class='slide-title'>
                    The Metropolis Ball 2019
                  </div>

                  <div class='slide-venue'>
                    Eris
                  </div>

                  <div class='slide-sep'></div>
                </div>
                <div data-id='863' class='event-slide'>
                  <div class='slide-bg'></div>

                  <div class='slide-date'>
                    Wed, Jan 02
                  </div>

                  <div class='slide-title'>
                    DJ Select
                  </div>

                  <div class='slide-venue'>
                    Marquee
                  </div>

                  <div class='slide-sep'></div>
                </div>
                <div data-id='917' class='event-slide'>
                  <div class='slide-bg'></div>

                  <div class='slide-date'>
                    Fri, Jan 04
                  </div>

                  <div class='slide-title'>
                    Eli Escobar, Whitney Fierce
                  </div>

                  <div class='slide-venue'>
                    House of Yes
                  </div>

                  <div class='slide-sep'></div>
                </div>
                <div data-id='1043' class='event-slide'>
                  <div class='slide-bg'></div>

                  <div class='slide-date'>
                    Thu, Jan 10
                  </div>

                  <div class='slide-title'>
                    PS1
                  </div>

                  <div class='slide-venue'>
                    Lavo
                  </div>

                  <div class='slide-sep'></div>
                </div>
                <div data-id='1278' class='event-slide'>
                  <div class='slide-bg'></div>

                  <div class='slide-date'>
                    Wed, Jan 16
                  </div>

                  <div class='slide-title'>
                    DJ Spade
                  </div>

                  <div class='slide-venue'>
                    Marquee
                  </div>

                  <div class='slide-sep'></div>
                </div>
                <div data-id='1520' class='event-slide'>
                  <div class='slide-bg'></div>

                  <div class='slide-date'>
                    Sat, Jan 19
                  </div>

                  <div class='slide-title'>
                    Rising Dust, Uriya, Solar Tribe, Babla, Green Tunes, Piloni
                  </div>

                  <div class='slide-venue'>
                    Analog BKNY
                  </div>

                  <div class='slide-sep'></div>
                </div>

              </div>

              <div class='slide-left hide'></div>
              <div class='slide-right'></div>

            </div>

          </div>

          <div class='list-wrapper'>

            <div class='day'>Sun, Dec 23</div>

            <div id='251' class='event' data-date='Dec 23' >
              <div class='event-pic'></div>
              <div class='event-title'>
                NGHTMRE Before Christmas Tour: Midnight Tyrannosaurus, Ducky, Swage
              </div>
              <div class='event-details'>
                <span>
                  Brooklyn Steel
                </span
                ><span>
                  &nbsp;-&nbsp;
                </span
                ><span>
                  Brooklyn, NY
                </span>
                  <span class='event-ages'>
                    18+
                  </span>
              </div>             

              <div class='arrow-link arrow'></div>

              <form class='favorite-wrapper hide' action='/events' method='new' data-remote='true'>
                <input type='hidden' name='eventID' value='251'>
                <input type='submit' class='favorite saved' value=''>
              </form>

              <div class='event-more'>

                <div class='event-links'>
                  <a href='https://edmtrain.com/new-york?event=93739&amp;tickets' target='_blank' rel='noopener noreferrer' class='event-website'>
                    Event Website
                  </a
                  ><a href='https://maps.google.com/?q=319 Frost St, Brooklyn, NY 11222, USA' target='_blank' rel='noopener noreferrer' class='event-map'>
                    Venue Map
                  </a>
                </div>

                <div class='soundcloud-links'>
                  <a href='/tours?artist=17' class='soundcloud-artist' data-remote=true>
                    NGHTMRE
                  </a
                  ><a class='soundcloud-link'>
                    <span class='scIcon'></span>
                    SoundCloud
                  </a>
                </div>
                <div class='soundcloud-links'>
                  <a href='/tours?artist=18' class='soundcloud-artist' data-remote=true>
                    Midnight Tyrannosaurus
                  </a
                  ><a class='soundcloud-link'>
                    <span class='scIcon'></span>
                    SoundCloud
                  </a>
                </div>
                <div class='soundcloud-links'>
                  <a href='/tours?artist=19' class='soundcloud-artist' data-remote=true>
                    Ducky
                  </a
                  ><a class='soundcloud-link'>
                  <span class='scIcon'></span>
                    SoundCloud
                  </a>
                </div>
                <div class='soundcloud-links'>
                  <a href='/tours?artist=20' class='soundcloud-artist' data-remote=true>
                    Swage
                  </a
                  ><a class='soundcloud-link'>
                  <span class='scIcon'></span>
                    SoundCloud
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

            
            <div id='262' class='event' data-date='Dec 23' >

              <div class='event-pic'></div>

              <div class='event-title'>
                  Ace Alvarez
              </div>

              <div class='event-details'>
                <span>
                  Doha Club
                </span
                ><span>
                  &nbsp;-&nbsp;
                </span
                ><span>
                  Long Island City, NY
                </span>
              </div>

              <div class='arrow-link arrow'></div>

              <form class='favorite-wrapper hide' action='/events' method='new' data-remote='true'>
                <input type='hidden' name='eventID' value='260'>
                <input type='submit' class='favorite' value=''>
              </form>

              <div class='event-more hide'>

                <div class='event-links'>
                  <a href='https://edmtrain.com/new-york?event=101893&amp;tickets' target='_blank' rel='noopener noreferrer' class='event-website'>
                    Event Website
                  </a
                  ><a href='https://maps.google.com/?q=38-34 31st St, Long Island City, NY 11101, USA' target='_blank' rel='noopener noreferrer' class='event-map'>
                    Venue Map
                  </a>
                </div>

                <div class='soundcloud-links'>
                  <a href='/tours?artist=395' class='soundcloud-artist' data-remote=true>
                    Ace Alvarez
                  </a
                  ><a class='soundcloud-link'>
                  <span class='scIcon'></span>
                    SoundCloud
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
      </section>

      <section id='festivals-wrapper'></section>

      <section id='tours-wrapper'></section>
    `;
    document.body.appendChild(page);
  });

  it('shows loading animation if arg is true', function() {
    loadLogic.showLoad(true);
    expect(document.querySelector('.loading-wrapper').classList).not.toContain('hide');
    expect(document.getElementById('concerts-wrapper').classList).toContain('hide');
  });

  it('shows highlights based on arg', function() {
    navLogic.tabHighlight(document.querySelector('.tab-cities'));
    expect(document.querySelector('.tab-cities').children[0].classList).toContain('tab-select');
    expect(document.querySelector('.tab-festivals').children[0].classList).not.toContain('tab-select');
  });

  it('hides all events', function() {
    let ev1 = document.getElementById('251');
    let ev2 = document.getElementById('262');
    expect(ev1.children[5].classList).not.toContain('hide');
    expect(ev2.children[5].classList).toContain('hide');
    eventsLogic.eventHider();
    expect(ev1.children[5].classList).toContain('hide');
    expect(ev2.children[5].classList).toContain('hide');
  });

  it('displays favorite button if event expanded', function() {
    let ev1 = document.getElementById('251');
    let ev2 = document.getElementById('262');
    eventsLogic.arrowFavDisplay(ev1.children[5]);
    expect(ev1.children[4].classList).not.toContain('hide');
    eventsLogic.arrowFavDisplay(ev2.children[5]);
    expect(ev2.children[4].classList).toContain('hide');
  });

  it('slides right in recent slider', function() {
    let sliderType = document.querySelector('.recent-slider');
    expect(window.getComputedStyle(sliderType).getPropertyValue('transform')).toContain('none');
    sliderLogic.shiftRight(sliderType);
    expect(window.getComputedStyle(sliderType).getPropertyValue('transform')).not.toContain('none');
  });


})