<template>
  <!-- Loading page-->
  <div id='preloader' class='loader-wrapper'>
    <div id='loading' class='loader'></div>
  </div>
  <!--  nav  -->
  <nav id='mainNav' class='navbar navbar-default navbar-fixed-top'>
    <div class='container'>
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class='navbar-header'>
        <button type='button' class='navbar-toggle collapsed' data-toggle='collapse'
                data-target='#bs-example-navbar-collapse-1'>
          <span class='sr-only'>Toggle navigation</span>
          <span class='icon-bar'></span>
          <span class='icon-bar'></span>
          <span class='icon-bar'></span>
        </button>
        <a class='navbar-brand navbar-brand-logo' href='#'>
          <svg-icon icon-class='logo' style='width:94px; height:94px;'></svg-icon>
        </a>
        <a class='navbar-brand navbar-brand-text' href='#'>
          <svg-icon icon-class='jokermanor'
                    style='width:122px; height:40px;margin-top: 30px'></svg-icon>
        </a>
      </div>
      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class='collapse navbar-collapse' id='bs-example-navbar-collapse-1'
           style='max-height: none;'>
        <ul class='nav navbar-nav navbar-right'>
          <li>
            <a class='page-scroll' style='cursor: pointer' @click='returnHome()'>Home</a>
          </li>
          <li class='mobile-hidden'>
            <a class='page-scroll' style='cursor: pointer' @click='returnAbout()'>About</a>
          </li>
          <li class='web-hidden'>
            <a class='page-scroll' style='cursor: pointer' @click='returnTokenMetrics()'>
              TokenMetrics
            </a>
          </li>
          <li class='web-hidden'>
            <a class='page-scroll' href='/ContractAudit/JokerManor_Contract_Audit_report.pdf'>Contract Audit</a>
          </li>
          <li>
            <a class='page-scroll' href='mailto:business@jokerfi.com'>Contact Us</a>
          </li>
          <li class='mobile-hidden'>
            <a href='https://twitter.com/joker_manor' class='contact1'>
              <svg-icon icon-class='contact1' style='width: 43px;height: 42px;margin-top: -10px'></svg-icon>
            </a>
          </li>
          <li class='mobile-hidden'>
            <a href='https://t.me/joinchat/OrA6XUXBpeYzZmRl' class='contact3'>
              <svg-icon icon-class='contact3' style='width: 43px;height: 42px;margin-top: -10px'></svg-icon>
            </a>
          </li>
          <li class='mobile-hidden'>
            <div class='dropdown'>
              <button class='page-scroll whitepaper' id='dropdownMenu1' data-toggle='dropdown'
                      aria-haspopup='true' aria-expanded='true'>Whitepaper
              </button>
              <ul class='dropdown-menu' aria-labelledby='dropdownMenu1'>
                <li><a
                  href='http://www.jokerfi.com/whitepaper/JokerManor_Whitepaper.pdf' style="font-family: 'Open Sans', sans-serif">English</a>
                </li>
                <li><a href='https://jokerfi.com/whitepaper/JokerManor-Whitepaper-KR.pdf'>Korean</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a id='launchapp' class='page-scroll launchapp' @click='onClick'>Launch
              App</a>
          </li>
        </ul>
      </div>
      <!-- navbar-collapse  -->
    </div>
  </nav>
  <!-- START HEARDER SECTION -->
  <header id='home' class='header'>
    <div class='header-background'></div>
    <div class='container'>
      <div class='row'>
        <div class='col-sm-10 col-md-10'>
          <div class='header-text'>
            <div class='row'>
              <div class='col-sm-4 col-md-4 mobile-hidden'>
                <p>EXPLORE METAVERSE AND EARN</p>
              </div>
            </div>
            <div class='row'>
              <div class='col-xs-12 col-sm-12 col-md-12'>
                <div class='header-title'>The Ultimate DeFI + GameFi</div>
                <div class='header-title'>Aggregator & Launchpad</div>
                <div class='row'>
                  <div class='col-sm-8 col-md-8 mobile-hidden'>
                    <h5>Play your favorite games across the GameFi metaverse. Invite and compete
                      with your friends. Earn
                      power and stake in LP Pools to earn rewards.</h5>
                  </div>
                </div>
              </div>
            </div>
            <div class='row mobile-hidden'>
              <div class='col-sm-7 col-md-7'>
                <div class='row'>
                  <div class='col-xs-4 col-sm-4 col-md-4'>
                    <button class='header-btn'
                            onclick="window.location.href='https://pancakeswap.finance/swap'">
                      Buy JKT
                    </button>
                  </div>
                  <div class='col-xs-6 col-sm-6 col-md-6'>
                    <button class='header-btn2' onclick="window.location.href='/ContractAudit/JokerManor_Contract_Audit_report.pdf'">Contract Audit</button>
                  </div>
                </div>
                <div class='row' style="margin-top:10px">
                  <div class='col-xs-10 col-sm-10 col-md-10'>
                    0x8E8123e286437B281cAa8abbF3A7f0CDf72b0aE6
                  </div>
                  <div class='col-xs-2 col-sm-2 col-md-2'>
                    <div class='popup' onclick='copyContract()'>
                      <svg-icon icon-class='big-copy' style='width: 20px; height: 20px'></svg-icon>
                      <span class='popuptext' id='myPopup'
                            style="font-family: 'Open Sans', sans-serif">Copied</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class='row header-mobile web-hidden'>
              <button class='header-mobile-btn'
                      onclick="window.location.href='https://pancakeswap.finance/swap'">
                Buy JKT
              </button>
              <div class='dropup' style='display: inline-block;'>
                <button class='header-mobile-btn' id='dropdownMenu2' data-toggle='dropdown'
                        aria-haspopup='true' aria-expanded='true'>Whitepaper
                </button>
                <ul class='dropdown-menu' aria-labelledby='dropdownMenu2'>
                  <li><a
                    href='http://www.jokerfi.com/whitepaper/JokerManor_Whitepaper.pdf'>English</a>
                  </li>
                  <li><a
                    href='https://jokerfi.com/whitepaper/JokerManor-Whitepaper-KR.pdf'>Korean</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- START INTRODUCE SECTION -->
  <section class='section-padding introduce'>
    <div class='container'>
      <div class='row'>
        <div class='col-xs-12 col-sm-12 col-md-12'>
          <div class='title'>
            <h1 style='font-size: 56px;font-weight: bold;color: white;'>How it works</h1>
            <p style='font-size: 18px;color: #979797;'>Just connect your bsc wallet, start
              playing and invite your
              friends.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- START WORKS SECTION -->
  <section id='about' class='works'>
    <div class='container'>
      <div class='row'>
        <div data-wow-delay='.3s' class='
          col-xs-10 col-xs-offset-1 col-sm-offset-0 col-sm-3 col-md-3 wow fadeInUp  animated'>
          <svg-icon icon-class='icon1' style='width: 64px; height: 64px;'></svg-icon>
          <h3 style='
            font-size: 20px;font-weight: bold;color: white;line-height: 24px;letter-spacing: 0.2px'>
            Connect Your
            Wallet</h3>
          <p style='font-size: 14px;font-weight: normal;color: #979797;line-height: 24px'>You will
            first need to connect
            a BSC network compatible wallet to be able to access our Defi pools and get rewards in
            your wallet.</p>
        </div>
        <div data-wow-delay='.4s' class='
          col-xs-10 col-xs-offset-1 col-sm-offset-0 col-sm-3 col-md-3 wow fadeInUp  animated'>
          <svg-icon icon-class='icon2' style='width: 64px; height: 64px;'></svg-icon>
          <h3 style='
            font-size: 20px;font-weight: bold;color: white;line-height: 24px;letter-spacing: 0.2px'>
            Play
            Games</h3>
          <p style='font-size: 14px;font-weight: normal;color: #979797;line-height: 24px'>You can
            browse your favorite
            metaverse games and click play to be directed to start playing and earning power
            points.</p>
        </div>
        <div data-wow-delay='.5s' class='
          col-xs-10 col-xs-offset-1 col-sm-offset-0 col-sm-3 col-md-3 wow fadeInUp  animated'>
          <svg-icon icon-class='icon3' style='width: 64px; height: 64px;'></svg-icon>
          <h3 style='
            font-size: 20px;font-weight: bold;color: white;line-height: 24px;letter-spacing: 0.2px'>
            Stake In Defi
            Pools</h3>
          <p style='font-size: 14px;font-weight: normal;color: #979797;line-height: 24px'>You can
            add liquidity on the
            platform and stake in the Defi pools of our farm to earn rewards in our native token
            JKT.</p>
        </div>
        <div data-wow-delay='.6s' class='
          col-xs-10 col-xs-offset-1 col-sm-offset-0 col-sm-3 col-md-3 wow fadeInUp  animated'>
          <svg-icon icon-class='icon4' style='width: 64px; height: 64px;'></svg-icon>
          <h3 style='
            font-size: 20px;font-weight: bold;color: white;line-height: 24px;letter-spacing: 0.2px'>
            Invite
            Friends & Earn</h3>
          <p style='font-size: 14px;font-weight: normal;color: #979797;line-height: 24px'>You can
            invite friends to
            power up your earnings and upgrade account to get extra rewards from your invitees’
            computing power.</p>
        </div>
      </div>
    </div>
  </section>
  <!-- START PRICE SECTION -->
  <section id='price' class='section-padding price'>
    <div class='container'>
      <div class='row'>
        <div class='col-md-12'>
          <div class='title'>
            <h2>Start <span>FREE,</span> or upgrade & earn more</h2>
            <p>No need to register. Just connect your BSC competible wallet, start playing and
              inviting friends.</p>
          </div>
          <div class='row'>
            <div class='mobile-hidden col-sm-10 col-md-10 col-sm-offset-1 col-md-offset-1'>
              <div class='row'>
                <!--Pricing Column-->
                <article class='pricing-column col-sm-4 col-md-4'>
                  <div class='inner-box'>
                    <div class='price-header text-center'>
                      <h1 class='price-title'>$100<span>~ JKT</span></h1>
                      <div>
                        <h2 class='price-no sliver'>
                          <svg-icon icon-class='sliver' style='width: 32px;height: 32px'></svg-icon>
                          Silver
                        </h2>
                      </div>
                      <div class='price-stats text-center'>
                        <p>You will get the benefits from the upgrades if your invitees stake.</p>
                      </div>
                    </div>
                    <ul class='price-stats text-left'>
                      <li>
                        <svg-icon icon-class='icon5'
                                  style='width: 24px;height: 24px;margin-left: -30px'></svg-icon>
                        15% extra computing power from your invitees’ pledged power.
                      </li>
                      <li>
                        <svg-icon icon-class='icon5'
                                  style='width: 24px;height: 24px;margin-left: -30px'></svg-icon>
                        5% extra computing power from your secondary invitees’ invitees’ pledged
                        power.
                      </li>
                    </ul>
                  </div>
                </article>
                <!--Pricing Column-->
                <article class='pricing-column col-sm-4 col-md-4'>
                  <div class='inner-box'>
                    <div class='price-header text-center'>
                      <h1 class='price-title'>$500<span>~ JKT</span></h1>
                      <div>
                        <h2 class='price-no gold'>
                          <svg-icon icon-class='gold' style='width: 32px;height: 32px'></svg-icon>
                          Gold
                        </h2>
                      </div>
                      <div class='price-stats text-center'>
                        <p>You will get the benefits from the upgrades if your invitees stake.</p>
                      </div>
                    </div>
                    <ul class='price-stats text-left'>
                      <li>
                        <svg-icon icon-class='icon5'
                                  style='width: 24px;height: 24px;margin-left: -30px'></svg-icon>
                        20% extra computing power from your invitees’ pledged power.
                      </li>
                      <li>
                        <svg-icon icon-class='icon5'
                                  style='width: 24px;height: 24px;margin-left: -30px'></svg-icon>
                        15% extra computing power from your secondary invitees’ invitees’ pledged
                        power.
                      </li>
                    </ul>
                  </div>
                </article>
                <!--Pricing Column-->
                <article class='pricing-column col-sm-4 col-md-4'>
                  <div class='inner-box'>
                    <div class='price-header text-center'>
                      <h1 class='price-title'>$1000<span> ~JKT</span></h1>
                      <div>
                        <h2 class='price-no platinum'>
                          <svg-icon icon-class='platinum'
                                    style='width: 32px;height: 32px'></svg-icon>
                          Platinum
                        </h2>
                      </div>
                      <div class='price-stats text-center'>
                        <p>You will get the benefits from the upgrades if your invitees stake.</p>
                      </div>
                    </div>
                    <ul class='price-stats text-left'>
                      <li>
                        <svg-icon icon-class='icon5'
                                  style='width: 24px;height: 24px;margin-left: -30px'></svg-icon>
                        30% extra computing power from your invitees’ pledged power.
                      </li>
                      <li>
                        <svg-icon icon-class='icon5'
                                  style='width: 24px;height: 24px;margin-left: -30px'></svg-icon>
                        20% extra computing power from your secondary invitee’s invitees’ pledged
                        power.
                      </li>
                    </ul>
                  </div>
                </article>
              </div>
              <p style='
                font-size: 18px;
                font-weight:normal;
                color: #FFFFFF;
                line-height: 32px;
                text-align: center;
                padding-top: 50px'>
                With the free basic player plan, you can invite friends to power up your Defi pool
                share and have extra
                computing power equal to 10% of your, or your invitee’s staked amount.</p>
            </div>
            <div class='web-hidden col-xs-12 web-price'>
              <article class='pricing-column col-xs-12'>
                <div class='inner-box'>
                  <svg-icon icon-class='sliver' style='width: 32px;height: 32px'></svg-icon>
                  <h2 class='price-no sliver'>
                    Silver
                  </h2>
                  <div class='inner-text'>
                    $100
                    <span>(~JKT) to upgrade</span>
                  </div>
                </div>
              </article>
              <article class='pricing-column col-xs-12'>
                <div class='inner-box'>
                  <svg-icon icon-class='gold' style='width: 32px;height: 32px'></svg-icon>
                  <h2 class='price-no gold'>
                    Gold
                  </h2>
                  <div class='inner-text'>
                    $500
                    <span>(~JKT) to upgrade</span>
                  </div>
                </div>
              </article>
              <article class='pricing-column col-xs-12'>
                <div class='inner-box'>
                  <svg-icon icon-class='platinum' style='width: 32px;height: 32px'></svg-icon>
                  <h2 class='price-no platinum'>
                    Platinum
                  </h2>
                  <div class='inner-text'>
                    $1000
                    <span>(~JKT) to upgrade</span>
                  </div>
                </div>
              </article>
            </div>
            <!-- end col -->
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- START PIE CHART SECTION -->
  <section id='tokenMetrics' class='section-padding price' style='display: block'>
    <div class='container'>
      <div class='row'>
        <div class='col-xs-12 col-sm-12 col-md-12'>
          <div class='title'>
            <h2>Token Metrics</h2>
            <p>JKT token will be used to power GameFi ecosystem and DeFI</p>
          </div>
          <div class='row'>
            <div class='col-xs-12 col-sm-10 col-md-10 col-sm-offset-1 col-md-offset-1'>
              <div class='inner-box-big' style='
                   text-align: center !important;vertical-align: middle;background-color: #202125'>
                <div id='jktchart' style='height: 600px;'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- START ROAD MAP SECTION-->
  <div class='roadmap' id='roadmap'>
    <div class='container'>
      <div class='roadmap'>
        <div class='title'>
          <h1>Roadmap</h1>
          <p>JKT token will be used to power GameFi ecosystem and DeFI</p>
        </div>
        <div class='changer-main'>
          <span class='devide-line'> </span>
          <div class='clearfix'></div>
          <div class='roadmap-block'>
                    <span class='botted'>
                        <svg-icon icon-class='dot' style='width: 24px;height: 24px'></svg-icon>
                    </span>
            <div class='changer-right wow bounceInRight' data-wow-delay='0.1s'
                 style='margin-top: -20px;'>
              <h3>2021 Q1</h3>
              <h5>Project Preparation & Team Establishment</h5>
              <p class='mobile-hidden'>The team was formed by a small group of five core,
                experienced and competent
                members, who completely
                designed the whole economic and tokenomics model and following on from this, they
                developed a prototype
                product, ready for soft launch. </p>
            </div>
            <div class='clearfix'></div>
          </div>
          <div class='roadmap-block-snd'>
                    <span class='botted'>
                        <svg-icon icon-class='dot' style='width: 24px;height: 24px'></svg-icon>
                    </span>
            <div class='changer-left-snd wow bounceInLeft' data-wow-delay='0.1s'>
              <h3>2021 Q2</h3>
              <h5>Institutional Fund Raising</h5>
              <p class='mobile-hidden'>Raised Capital via a combination of Institutional Funds, VCs
                and High Networth
                Individuals was
                completed, alongside this the tech team worked in conjunction with the rest of the
                teams, especially the
                product and strategic development teams to build upon, redefine and add features to
                the already existing
                prototype product.</p>
            </div>
            <div class='clearfix'></div>
          </div>
          <div class='roadmap-block-trd'>
                    <span class='botted'>
                        <svg-icon icon-class='dot' style='width: 24px;height: 24px'></svg-icon>
                    </span>
            <div class='changer-right-trd wow bounceInRight'>
              <h3>2021 Q3</h3>
              <h5>Exchanges Listing & Official Launch</h5>
              <p class='mobile-hidden'>We will officially launch the product and start building a
                community around it,
                alongside this we will also complete our partnerships for the listing of the JKT
                token, initially the launch will be on the PancakeSwap DEX, following other
                exchanges including a combination of both
                CEX’s and DEX’s.</p>
            </div>
            <div class='clearfix'></div>
          </div>
          <div class='roadmap-block-forth'>
                    <span class='botted'>
                        <svg-icon icon-class='dot' style='width: 24px;height: 24px'></svg-icon>
                    </span>
            <div class='changer-left-forth wow bounceInLeft' data-wow-delay='0.1s'>
              <h3>2021 Q4</h3>
              <h5>Metaverse Blockchain Game Launch</h5>
              <p class='mobile-hidden'>We will complete the development and launch of our inhouse
                Metaverse gaming
                infrastructure and then
                start to develop this foundation infrastructure, of which a key component will be to
                assist in creating,
                inviting, partnering up with and incubating games independently as well as partner
                with leading GameFi
                and blockchain based and tokenized projects to grow our metaverse ecosystem. In the
                continuation of
                developing this Metaverse ecosystem, JokerManor will formally launch a large,
                inclusive
                and integrated
                meta-universe game in 2022 Q1.</p>
            </div>
            <div class='clearfix'></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- START CLIENTS LOGO SECTION -->
  <section id='executiveteam' class='section-padding executiveteam'>
    <div class='container'>
      <div class='title'>
        <h2>Executive Team</h2>
        <p>Our team of dark heroes works 24/7 to help you experience magic.</p>
      </div>
      <div class='row'>
        <div class='col-xs-12 col-sm-2 col-md-2 col-sm-offset-1 col-md-offset-1'>
          <a href='#'>
            <svg-icon icon-class='position1' style='width: 171px; height: 171px;' />
          </a>
          <h5 class='position'>Chief Technology Officer & Co-Founder</h5>
          <p class='name'>Lorenzo</p>
          <p class='resume'>Serial Entrepreneur, Former Engineer Lead in Microsoft</p>
        </div>
        <div class='col-xs-12 col-sm-2 col-md-2'>
          <a href='#'>
            <svg-icon icon-class='position2' style='width: 171px; height: 171px;' />
          </a>
          <h5 class='position'>Strategic Development & Partnerships</h5>
          <p class='name'>John</p>
          <p class='resume'>Entrepreneur with 17 years of experience – 4 years in the
            blockchain based tokenized
            ecosystem</p>
        </div>
        <div class='col-xs-12 col-sm-2 col-md-2'>
          <a href='#'>
            <svg-icon icon-class='position3' style='width: 171px; height: 171px;' />
          </a>
          <h5 class='position'>Chief Executive Officer & Founder</h5>
          <p class='name'>Barry</p>
          <p class='resume'>Serial Entrepreneur, Former Product Lead in Google</p>
        </div>
        <div class='col-xs-12 col-sm-2 col-md-2'>
          <a href='#'>
            <svg-icon icon-class='position4' style='width: 171px; height: 171px;' />
          </a>
          <h5 class='position'>Chief Marketing Officer</h5>
          <p class='name'>Doris</p>
          <p class='resume'>11 years in Game industry, Former Zynga Games Investment & BD
            Manager</p>
        </div>
        <div class='col-xs-12 col-sm-2 col-md-2'>
          <a href='#'>
            <svg-icon icon-class='position5' style='width: 171px; height: 171px;' />
          </a>
          <h5 class='position'>Chief Operations Officer</h5>
          <p class='name'>Eric</p>
          <p class='resume'>Master Degree in Economy, Former Product Senior Manager in
            Nexon</p>
        </div>
      </div>
    </div>
  </section>
  <!-- START PARTNER SECTION -->
  <section id='partner' class='section-padding partner'>
    <div class='container'>
      <div class='row'>
        <div class='col-xs-12 col-sm-12 col-md-12'>
          <div class='title'>
            <h2>Partners</h2>
            <p>We partner with the most prominent projects across the metaverse</p>
          </div>
        </div>
      </div>
      <div class='row partner-imgs'>
        <div class='col-xs-12 col-sm-2 col-md-2'>
          <a href='#'>
            <svg-icon icon-class='partner1' style='width: 96px; height: 32px' />
          </a>
        </div>
        <div class='col-xs-12 col-sm-2 col-md-2'>
          <a href='#'>
            <svg-icon icon-class='partner2' style='width: 96px; height: 32px' />
          </a>
        </div>
        <div class='col-xs-12 col-sm-2 col-md-2'>
          <a href='#'>
            <svg-icon icon-class='partner3' style='width: 96px; height: 32px' />
          </a>
        </div>
        <div class='col-xs-12 col-sm-2 col-md-2'>
          <a href='#'>
            <svg-icon icon-class='partner4' style='width: 96px; height: 32px' />
          </a>
        </div>
        <div class='col-xs-12 col-sm-2 col-md-2'>
          <a href='#'>
            <svg-icon icon-class='partner5' style='width: 96px; height: 32px' />
          </a>
        </div>
        <div class='col-xs-12 col-sm-2 col-md-2 mobile-hidden'>
          <a class='btn-partner' href='mailto:business@jokerfi.com'>Become a partner
            <svg-icon icon-class='right-arrow' style='width: 13px; height: 13px' />
          </a>
        </div>
      </div>
    </div>
  </section>
  <!-- START FOOTER SECTION -->
  <footer class='section-padding footer'>
    <div class='container'>
      <div class='row'>
        <div class='logo' style='display: inline-block;'>
          <svg-icon icon-class='jokermanor' style='width: 122px; height: 40px;'></svg-icon>
        </div>
      </div>
      <div class='row mobile-hidden' style="
        font-size: 18px;
        font-weight: normal;
        font-family: 'Open Sans',sans-serif;
        line-height: 28px;
        color: #979797">
        <p>You can contact us with questions using the channel of your choice</p>
      </div>
      <div class='row links'>
        <div class='col-md-12'>
          <a href='https://twitter.com/joker_manor' class='contact1'>
            <svg-icon icon-class='contact1' style='width: 43px;height: 42px'></svg-icon>
          </a>
          <a href='http://www.medium.com/@JokerManorMetaverse' class='contact2'>
            <svg-icon icon-class='contact2' style='width: 43px;height: 42px'></svg-icon>
          </a>
          <a href='https://t.me/joinchat/OrA6XUXBpeYzZmRl' class='contact3'>
            <svg-icon icon-class='contact3' style='width: 43px;height: 42px'></svg-icon>
          </a>
        </div>
      </div>
      <div class='row cpright'>
        <div class='col-sm-4 col-md-4 col-sm-offset-4 col-md-offset-4 copyright'>
          <p>Copyright &copy; 2021.JokerManor</p>
        </div>
      </div>
    </div>
  </footer>
  <!-- Back to top -->
  <a href='#' class='back-to-top' id='back-to-top'>
    <i class='fa fa-chevron-up' aria-hidden='true'></i>
  </a>
</template>

<script lang='ts'>
import {
  reactive,
  defineComponent, onMounted,
} from 'vue';
import SvgIcon from '@/components/SvgIcon.vue';
import * as echarts from 'echarts';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'landingPage',
  components: {
    SvgIcon,
  },
  setup() {
    const imageUrls = reactive({});

    function returnHome() {
      const home = document.querySelector('#home');
      if (home) {
        home.scrollIntoView(true);
      }
    }

    function returnAbout() {
      const about = document.querySelector('#about');
      if (about) {
        about.scrollIntoView(true);
      }
    }

    function returnTokenMetrics() {
      const about = document.querySelector('#tokenMetrics');
      if (about) {
        about.scrollIntoView(true);
      }
    }

    function drawPie() {
      // create echarts instance based on DOM node
      const chartDom: HTMLElement = document.getElementById('jktchart') as HTMLElement;
      var myChart = echarts.init(chartDom);
      var option;
      const width = window.innerWidth;

      if (width < 768) {
        option = {
          title: {
            text: ['{a|TOTAL TOKEN ISSUANCE}', '{b|1,000,000,000 JKT}'].join('\n'),
            left: 'center',
            top: 'middle',
            textStyle: {
              rich: {
                a: {
                  color: '#CD2A16',
                  lineHeight: 15,
                  height: 20,
                  fontSize: 4,
                  padding: [10, 10],
                  fontFamily: 'Open Sans',
                  fontWeight: 'bold',
                },
                b: {
                  color: '#FFFFFF',
                  fontSize: 9,
                  fontWeight: 'bold',
                  padding: 10,
                  fontFamily: 'Open Sans',
                },
              },
            },
          },
          tooltip: {
            trigger: 'item',
          },
          series: [{
            name: 'JKT',
            type: 'pie',
            radius: ['55%', '70%'],
            data: [{
              value: 50,
              name: 'DeFi',
            },
              {
                value: 40,
                name: 'GameFi',
              },
              {
                value: 3,
                name: 'Marketing Promotion',
              },
              {
                value: 4,
                name: 'Early Investor',
              },
              {
                value: 2,
                name: 'Technical Team',
              },
              {
                value: 1,
                name: 'Pre-sale before launch',
              },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            labelLine: {
              length: 30,
              length2: 20,
            },
            clockwise: true,
            startAngle: 270,
            label: {
              formatter: '{name|{b}: {c}%}',
              rich: {
                name: {
                  fontSize: 6,
                  color: 'white',
                  fontWeight: 'normal',
                },
              },
            },
            color: [
              '#CD2A16',
              '#5759627F',
              '#575962',
              '#9D9D9D',
              '#D8D8D8',
              '#FFFFFF',
              '#fc8452',
              '#9a60b4',
              '#ea7ccc',
            ],
          }],
        };
      } else {
        option = {
          title: {
            text: [
              '{a|TOTAL TOKEN ISSUANCE}',
              '{b|1,000,000,000 JKT}',
              '{c|50% DeFi mining | 40% in-game mining\n' +
              '|10% Technical team, investors & makreting fees}',
            ].join('\n'),
            left: 'center',
            top: 'middle',
            textStyle: {
              rich: {
                a: {
                  color: '#CD2A16',
                  lineHeight: 15,
                  height: 20,
                  padding: [10, 10],
                  fontFamily: 'Open Sans',
                  fontSize: 14,
                  fontWeight: 'bold',
                },
                b: {
                  color: '#FFFFFF',
                  fontSize: 32,
                  fontWeight: 'bold',
                  padding: 10,
                  fontFamily: 'Open Sans',
                },
                c: {
                  color: '#979797',
                  fontSize: 14,
                  padding: 10,
                  fontFamily: 'Open Sans',
                  fontWeight: 'normal',
                },
              },
            },
          },
          tooltip: {
            trigger: 'item',
          },
          series: [{
            name: 'JKT',
            type: 'pie',
            radius: ['55%', '70%'],
            data: [{
              value: 50,
              name: 'DeFi',
            },
              {
                value: 40,
                name: 'GameFi',
              },
              {
                value: 3,
                name: 'Marketing Promotion',
              },
              {
                value: 4,
                name: 'Early Investor',
              },
              {
                value: 2,
                name: 'Technical Team',
              },
              {
                value: 1,
                name: 'Pre-sale before launch',
              },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            labelLine: {
              length: 70,
              length2: 50,
            },
            clockwise: true,
            startAngle: 270,
            label: {
              formatter: '{name|{b}: {c}%}',
              rich: {
                name: {
                  fontSize: 18,
                  color: 'white',
                  fontWeight: 'normal',
                },
              },
            },
            color: [
              '#CD2A16',
              '#5759627F',
              '#575962',
              '#9D9D9D',
              '#D8D8D8',
              '#FFFFFF',
              '#fc8452',
              '#9a60b4',
              '#ea7ccc',
            ],
          }],
        };
      }

      option && myChart.setOption(option);
    }

    const router = useRouter();

    function onClick() {
      let search = router.currentRoute.value.query;
      router.push({
        path: '/splashScreen',
        query: search,
      });
    }

    onMounted(() => {
      drawPie();
    });

    return {
      imageUrls,
      returnHome,
      returnAbout,
      returnTokenMetrics,
      onClick,
    };
  },
});
</script>

<style scoped src='../../assets/css/landingPage/animate.css'></style>
<style scoped src='../../assets/css/landingPage/bootstrap.min.css'></style>
<style scoped src='../../assets/css/landingPage/style.css'></style>
<style scoped src='../../assets/css/landingPage/baguetteBox.css'></style>
