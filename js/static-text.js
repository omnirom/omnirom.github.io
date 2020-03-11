function buildContacts() {
  let container = document.getElementById("sub-container");
  const row = `
  <div class="row">
    <div class="col-lg-8 mx-auto">
      <h2>Contacts</h2>
      <p class="lead">
            The core of Omni is the community, and we recognize that everyone has a role to play. So we have a number of
            ways for you to get involved:</p>
          <ul>
            <li>
              <p class="lead">
                <a href="http://github.com/omnirom">Github</a> – our codebase where we build from.</p>
            </li>
            <li>
              <p class="lead"><a href="http://gerrit.omnirom.org/">Gerrit</a> – view our project at the code level with
                the ability to see what’s merged, what’s
                open and
                what’s in review.</p>
            </li>
            <li>
              <p class="lead"><a href="https://t.me/OmniROM_Community">Telegram</a> – get connected to the Omni
                community in realtime on Telegram.</p>
            </li>
            <li>
            <p class="lead"><a href="https://dl.omnirom.org">Download</a> – download builds for supported devices.</p>
          </li>
          </ul>
      </div>
    </div>
  </div> `;
  container.innerHTML = row;
}

function buildAbout() {
  let container = document.getElementById("sub-container");
  const row = `
  <div class="row">
    <div class="col-lg-8 mx-auto">
    <h2>About Omni</h2>
    <p class="lead">
      OmniROM is our Android custom ROM variant, feature-packed but always with stability as #1 priority in mind.
    </p>
    <p class="lead">
      Based on the Android Open Source Project (AOSP) and enriched by our developers with lots of custom
      enhancements, OmniROM has set out to give you a great Android experience on your mobile.
      <p class="lead">
        Omni isn’t better, just different.</p>
      <p class="lead">
        It’s another option for the billion Android users out there. Android (vs. iOS and every other mobile OS)
        has
        thrived on options as well as the gigantic, talented development community that has emerged to build those
        options. That’s the beauty of Android – that you can pick and choose from a smorgasbord of devices with
        varying features and functionality.
      </p>
      <p class="lead">
        Omni is a chance to get involved, no matter who you are.</p>
      <p class="lead">
        Developers, whether you’ve been developing apps for a week, or ROM features for 3 years, you’re welcome.
        Users, we know you want to help out, and now you can - we encourage all levels of contribution, from code
        to
        reporting bugs to squashing bugs to (what developer's tend to hate) documentation.</p>
    </p>
      </div>
    </div>
  </div>  `;
  container.innerHTML = row;
}
