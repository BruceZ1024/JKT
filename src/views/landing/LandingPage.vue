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
        <a class='navbar-brand' href='#'>
          <svg-icon icon-class='logo' style='width:94px; height:94px;'></svg-icon>
        </a>
        <a class='navbar-brand' href='#'>
          <svg-icon icon-class='jokermanor' style='width:122px; height:40px;margin-top: 30px'></svg-icon>
        </a>
      </div>
      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
        <ul class='nav navbar-nav navbar-right'>
          <li>
            <a class='page-scroll' href='#home'>Home</a>
          </li>
          <li>
            <a class='page-scroll' href='#about'>About</a>
          </li>
          <!--		  <li>-->
          <!--			 <a class="page-scroll" href="#price">Contract Audit</a>-->
          <!--		  </li>-->
          <li>
            <a class='page-scroll' href='mailto:business@jokerfi.com'>Contact Us</a>
          </li>
          <li>
            <a class='page-scroll whitepaper'
               href='http://www.jokerfi.com/whitepaper/JokerManor_Whitepaper.pdf'>Whitepaper</a>
          </li>
          <li>
            <a id='launchapp' class='page-scroll launchapp' href='#' onmouseover='onHover()'
               onmouseout='offHover()'>Launch
              App</a>
          </li>
        </ul>
      </div>
      <!-- navbar-collapse  -->
    </div>
  </nav>
  <!-- START HEARDER SECTION -->
  <header id='home' class='header'>
    <div class='container'>
      <div class='row'>
        <div class='col-xs-10 col-sm-10 col-md-10'>
          <div class='header-text'>
            <div class='row'>
              <div class='col-xs-4 col-sm-4 col-md-4'>
                <p>EXPLORE METAVERSE AND EARN</p>
              </div>
            </div>
            <div class='row'>
              <div class='col-xs-12 col-sm-12 col-md-12'>
                <h1>The Ultimate DeFI + GameFi</h1>
                <h1>Aggregator & Launchpad</h1>
                <div class='row'>
                  <div class='col-xs-8 col-sm-8 col-md-8'>
                    <h5>Play your favorite games across the GameFi metaverse. Invite and compete
                      with your friends. Earn
                      power and stake in LP Pools to earn rewards.</h5>
                  </div>
                </div>
              </div>
            </div>
            <div class='row'>
              <div class='col-xs-7 col-sm-7 col-md-7'>
                <div class='row'>
                  <div class='col-xs-4 col-sm-4 col-md-4'>
                    <button class='header-btn'
                            onclick="window.location.href='https://pancakeswap.finance/swap?outputCurrency=0xc864019047b864b6ab609a968ae2725dfaee808a'">
                      Buy JKT
                    </button>
                  </div>
                  <div class='col-xs-6 col-sm-6 col-md-6'>
                    <button class='header-btn2' onclick=''>BscScan Contract</button>
                  </div>
                  <div class='col-xs-2 col-sm-2 col-md-2'>
                    <div class='popup' onclick='copyContract()'>
                      <svg-icon icon-class='icon7' style="width: 20px; height: 20px"></svg-icon>
                      <span class='popuptext' id='myPopup' style="font-family: 'Open Sans', sans-serif">Copied</span>
                    </div>
                  </div>
                </div>
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
          <div class='row'>
            <div class='col-xs-12 col-sm-12  col-md-12' style='padding-top: 80px;'>
              <div class='title'>
                <h1 style='font-size: 56px;font-weight: bold;color: white;'>How it works</h1>
                <p style='font-size: 18px;color: #979797;'>Just connect your bsc wallet, start
                  playing and invite your
                  friends.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- START WORKS SECTION -->
  <section id='about' class='works'>
    <div class='container'>
      <div class='row'>
        <div data-wow-delay='.3s' class='col-xs-12 col-sm-3 col-md-3 wow fadeInUp  animated'>
          <svg-icon icon-class='icon1' style='width: 64px; height: 64px;'></svg-icon>
          <h3
            style='font-size: 20px;font-weight: bold;color: white;line-height: 24px;letter-spacing: 0.2px'>
            Connect You
            Wallet</h3>
          <p style='font-size: 14px;font-weight: normal;color: #979797;line-height: 24px'>You will first need to connect
            a BSC network compatible wallet to be able to access our Defi pools and get rewards in your wallet.</p>
        </div>
        <div data-wow-delay='.4s' class='col-xs-12 col-sm-3 col-md-3 wow fadeInUp  animated'>
          <svg-icon icon-class='icon2' style='width: 64px; height: 64px;'></svg-icon>
          <h3
            style='font-size: 20px;font-weight: bold;color: white;line-height: 24px;letter-spacing: 0.2px'>
            Play
            Games</h3>
          <p style='font-size: 14px;font-weight: normal;color: #979797;line-height: 24px'>You can browse your favorite
            metaverse games and click play to be directed to start playing and earning power points.</p>
        </div>
        <div data-wow-delay='.5s' class='col-xs-12 col-sm-3 col-md-3 wow fadeInUp  animated'>
          <svg-icon icon-class='icon3' style='width: 64px; height: 64px;'></svg-icon>
          <h3
            style='font-size: 20px;font-weight: bold;color: white;line-height: 24px;letter-spacing: 0.2px'>
            Stake In LP
            Pools</h3>
          <p style='font-size: 14px;font-weight: normal;color: #979797;line-height: 24px'>You can add liquidity on the
            platform and stake in the Defi pools of our farm to earn rewards in our native token JKT.</p>
        </div>
        <div data-wow-delay='.6s' class='col-xs-12 col-sm-3 col-md-3 wow fadeInUp  animated'>
          <svg-icon icon-class='icon4' style='width: 64px; height: 64px;'></svg-icon>
          <h3
            style='font-size: 20px;font-weight: bold;color: white;line-height: 24px;letter-spacing: 0.2px'>
            Invite
            Friends & Earn</h3>
          <p style='font-size: 14px;font-weight: normal;color: #979797;line-height: 24px'>You can invite friends to
            power up your earnings and upgrade account to get extra rewards from your invitees’ computing power.</p>
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
            <div
              class='col-md-xs col-sm-10 col-md-10 col-xs-offset-1 col-sm-offset-1 col-md-offset-1'>
              <div class='row'>
                <!--Pricing Column-->
                <article class='pricing-column col-xs-4 col-sm-4 col-md-4'>
                  <div class='inner-box'>
                    <div class='price-header text-center'>
                      <h1 class='price-title'>$100<span>~ JKT</span></h1>
                      <div>
                        <h2 class='price-no sliver'>
                          <svg-icon icon-class='sliver' style="width: 32px;height: 32px"></svg-icon>
                          Silver
                        </h2>
                      </div>
                      <div class='price-stats text-center'>
                        <p>You will get the benefits from the upgrades if your invitees stake.</p>
                      </div>
                    </div>
                    <ul class='price-stats text-left'>
                      <li>
                        <svg-icon icon-class='icon5' style="width: 24px;height: 24px;margin-left: -30px"></svg-icon>
                        15% extra computing power from your invitees’ pledged power.
                      </li>
                      <li>
                        <svg-icon icon-class='icon5' style="width: 24px;height: 24px;margin-left: -30px"></svg-icon>
                        5% extra computing power from your secondary invitees’ invitees’ pledged power.
                      </li>
                    </ul>
                    <!--						 <div class="text-center">-->
                    <!--							<a href="" class="btn-wt-bdr3">Connect and Upgrade  <embed src="assets/img/icon6.svg" width="13" height="13" type="image/svg+xml"></a>-->
                    <!--						 </div>-->
                  </div>
                </article>
                <!--Pricing Column-->
                <article class='pricing-column col-xs-4 col-sm-4 col-md-4'>
                  <div class='inner-box'>
                    <div class='price-header text-center'>
                      <h1 class='price-title'>$500<span>~ JKT</span></h1>
                      <div>
                        <h2 class='price-no gold'>
                          <svg-icon icon-class='gold' style="width: 32px;height: 32px"></svg-icon>
                          Gold
                        </h2>
                      </div>
                      <div class='price-stats text-center'>
                        <p>You will get the benefits from the upgrades if your invitees stake.</p>
                      </div>
                    </div>
                    <ul class='price-stats text-left'>
                      <li>
                        <svg-icon icon-class='icon5' style="width: 24px;height: 24px;margin-left: -30px"></svg-icon>
                        20% extra computing power from your invitees’ pledged power.
                      </li>
                      <li>
                        <svg-icon icon-class='icon5' style="width: 24px;height: 24px;margin-left: -30px"></svg-icon>
                        15% extra computing power from your secondary invitees’ invitees’ pledged power.
                      </li>
                    </ul>
                    <!--						 <div class="text-center">-->
                    <!--							 <a href="" class="btn-wt-bdr3">Connect and Upgrade  <embed src="assets/img/icon6.svg" width="13" height="13" type="image/svg+xml"></a>-->
                    <!--						 </div>-->
                  </div>
                </article>
                <!--Pricing Column-->
                <article class='pricing-column col-xs-4 col-sm-4 col-md-4'>
                  <div class='inner-box'>
                    <div class='price-header text-center'>
                      <h1 class='price-title'>$1000<span> ~JKT</span></h1>
                      <div>
                        <h2 class='price-no platinum'>
                          <svg-icon icon-class='platinum' style="width: 32px;height: 32px"></svg-icon>
                          Platinum
                        </h2>
                      </div>
                      <div class='price-stats text-center'>
                        <p>You will get the benefits from the upgrades if your invitees stake.</p>
                      </div>
                    </div>
                    <ul class='price-stats text-left'>
                      <li>
                        <svg-icon icon-class='icon5' style="width: 24px;height: 24px;margin-left: -30px"></svg-icon>
                        30% extra computing power from your invitees’ pledged power.
                      </li>
                      <li>
                        <svg-icon icon-class='icon5' style="width: 24px;height: 24px;margin-left: -30px"></svg-icon>
                        20% extra computing power from your secondary invitee’s invitees’ pledged power.
                      </li>
                    </ul>
                    <!--						 <div class="text-center">-->
                    <!--							 <a href="" class="btn-wt-bdr3">Connect and Upgrade  <embed src="assets/img/icon6.svg" width="13" height="13" type="image/svg+xml"></a>-->
                    <!--						 </div>-->
                  </div>
                </article>
              </div>
              <p
                style='font-size: 18px;font-weight:normal;color: #FFFFFF;line-height: 32px;text-align: center;padding-top: 50px'>
                With the free basic player plan, you can invite friends to power up your Defi pool share and have extra
                computing power equal to 10% of your, or your invitee’s staked amount.</p>
            </div>
            <!-- end col -->
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- START PIE CHART SECTION -->
  <section id='' class='section-padding price' style='display: block'>
    <div class='container'>
      <div class='row'>
        <div class='col-xs-12 col-sm-12 col-md-12'>
          <div class='title'>
            <h2>Token Metrics</h2>
            <p>JKT token will be used to power GameFi ecosystem and DeFI</p>
          </div>
          <div class='row'>
            <div
              class='col-xs-10 col-sm-10 col-md-10 col-xs-offset-1 col-sm-offset-1 col-md-offset-1'>
              <div class='inner-box-big'
                   style='text-align: center !important;vertical-align: middle;background-color: #202125'>
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
        <div>
          <h1>Roadmap</h1>
          <p>JKT token will be used to power GameFi ecosystem and DeFI</p>
        </div>
        <div class='changer-main'>
          <span class='devide-line'> </span>
          <div class='clearfix'></div>
          <div class='ch-bott1'>
            <span class='botted'>
              <svg-icon icon-class='dot' style="width: 24px;height: 24px"></svg-icon>
            </span>
          </div>
          <div class='roadmap-block'>
            <div class='changer-right wow bounceInRight' data-wow-delay='0.1s'
                 style='margin-top: -20px;'>
              <h3>2021 Q1</h3>
              <h5>Project Preparation & Team Establishment</h5>
              <p>The team was formed by a small group of five core, experienced and competent
                members, who completely
                designed the whole economic and tokenomics model and following on from this, they
                developed a prototype
                product, ready for soft launch. </p>
            </div>
          </div>
          <div class='clearfix'></div>
          <div class='ch-bott1'>
            <span class='botted'>
              <svg-icon icon-class='dot' style="width: 24px;height: 24px"></svg-icon>
            </span>
          </div>
          <div class='roadmap-block-snd'>
            <div class='changer-left-snd wow bounceInLeft' data-wow-delay='0.1s'
                 style='margin-top: 33px;'>
              <h3>2021 Q2</h3>
              <h5>Institutional Fund Raising</h5>
              <p>Raised Capital via a combination of Institutional Funds, VCs and High Networth
                Individuals was
                completed, alongside this the tech team worked in conjunction with the rest of the
                teams, especially the
                product and strategic development teams to build upon, redefine and add features to
                the already existing
                prototype product.</p>
            </div>
          </div>
          <div class='clearfix'></div>
          <div class='ch-bott1'>
            <span class='botted'>
               <svg-icon icon-class='dot' style="width: 24px;height: 24px"></svg-icon>
            </span>
          </div>
          <div class='roadmap-block-trd'>
            <div class='changer-right-trd wow bounceInRight' style='margin-top: 60px;'>
              <h3>2021 Q3</h3>
              <div>Metaverse Blockchain Game Launch</div>
              <p>We will officially launch the product and start building a community around it,
                alongside this we will also complete our partnerships for the listing of the JKT
                token, initially the launch will be on the PancakeSwap DEX, following other
                exchanges including a combination of both
                CEX’s and DEX’s.</p>
            </div>
          </div>
          <div class='clearfix'></div>
          <div class='ch-bott1'>
            <span class='botted'>
              <svg-icon icon-class='dot' style="width: 24px;height: 24px"></svg-icon>
            </span>
          </div>
          <div class='roadmap-block-forth'>
            <div class='changer-left-forth wow bounceInLeft' data-wow-delay='0.1s'
                 style='margin-top: -35px;'>
              <h3>2022 Q4</h3>
              <h5>Exchanges Listing & Official Launch</h5>
              <p>We will complete the development and launch of our inhouse Metaverse gaming
                infrastructure and then
                start to develop this foundation infrastructure, of which a key component will be to
                assist in creating,
                inviting, partnering up with and incubating games independently as well as partner
                with leading GameFi
                and blockchain based and tokenized projects to grow our metaverse ecosystem. In the
                continuation of
                developing this Metaverse ecosystem, Squid will formally launch a large, inclusive
                and integrated
                meta-universe game in 2022 Q3.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- START CLIENTS LOGO SECTION -->
  <section id='executiveteam' class='section-padding executiveteam'>
    <div class='container'>
      <div class='row'>
        <div class='title'>
          <h2>Executive Team</h2>
          <p>Our team of dark heroes works 24/7 to help you experience magic.</p>
        </div>
        <div class='col-xs-12 col-sm-12 col-md-12 col-xs-offset-1 col-sm-offset-1 col-md-offset-1'>
          <ul style='background-color: #191A1E'>
            <li><a href='#'>
              <svg-icon icon-class='position1' style='width: 171px; height: 171px;'/>
            </a>
            </li>
            <li><a href='#'>
              <svg-icon icon-class='position2' style='width: 171px; height: 171px;'/>
            </a>
            </li>
            <li><a href='#'>
              <svg-icon icon-class='position3' style='width: 171px; height: 171px;'/>
            </a>
            </li>
            <li><a href='#'>
              <svg-icon icon-class='position4' style='width: 171px; height: 171px;'/>
            </a>
            </li>
            <li><a href='#'>
              <svg-icon icon-class='position5' style='width: 171px; height: 171px;'/>
            </a>
            </li>
          </ul>
        </div>
        <div class='col-xs=12 col-sm-12 col-md-12 col-xs-offset-1 col-sm-offset-1 col-md-offset-1'
             style='margin-top: -50px'>
          <ul style='background-color: #191A1E'>
            <li><h5 class='position'>Chief Technology Officer & Co-Founder</h5></li>
            <li><h5 class='position'>Strategic Development & Partnerships</h5></li>
            <li><h5 class='position'>Chief Executive Officer & Founder</h5></li>
            <li><h5 class='position'>Chief Marketing Officer</h5></li>
            <li><h5 class='position'>Chief Operations Officer</h5></li>
          </ul>
        </div>
        <div class='col-xs=12 col-sm-12 col-md-12 col-xs-offset-1 col-sm-offset-1 col-md-offset-1'
             style='margin-top: -50px'>
          <ul style='background-color: #191A1E'>
            <li><p class='name'>Lorenzo</p></li>
            <li><p class='name'>John</p></li>
            <li><p class='name'>Barry</p></li>
            <li><p class='name'>Doris</p></li>
            <li><p class='name'>Eric</p></li>
          </ul>
        </div>
        <div class='col-xs=12 col-sm-12 col-md-12 col-xs-offset-1 col-sm-offset-1 col-md-offset-1'
             style='margin-top: -50px'>
          <ul style='background-color: #191A1E'>
            <li><p class='resume'>Serial Entrepreneur, Former Engineer Lead in Microsoft</p></li>
            <li><p class='resume'>Entrepreneur with 17 years of experience – 4 years in the
              blockchain based tokenized
              ecosystem</p></li>
            <li><p class='resume'>Serial Entrepreneur, Former Product Lead in Google</p></li>
            <li><p class='resume'>11 years in Game industry, Former Zynga Games Investment & BD
              Manager</p></li>
            <li><p class='resume'>Master Degree in Economy, Former Product Senior Manager in
              Nexon</p></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <!-- START PARTNER SECTION -->
  <section id='partner' class='section-padding partner' style='text-align: center;'>
    <div class='container' style='padding-top: 100px'>
      <div class='row'>
        <div class='col-xs-12 col-sm-12 col-md-12'>
          <div class='title'>
            <h2>Partners</h2>
            <p>We partner with the most prominent projects across the metaverse</p>
          </div>
        </div>
        <div class='row' style='padding-top: 200px;padding-bottom: 175px'>
          <div class='col-xs-12 col-sm-2 col-md-2'>
            <a href='#'>
              <svg-icon icon-class='partner1' style='width: 96px; height: 32px'/>
            </a>
          </div>
          <div class='col-xs-12 col-sm-2 col-md-2'>
            <a href='#'>
              <svg-icon icon-class='partner2' style='width: 96px; height: 32px'/>
            </a>
          </div>
          <div class='col-xs-12 col-sm-2 col-md-2'>
            <a href='#'>
              <svg-icon icon-class='partner3' style='width: 96px; height: 32px'/>
            </a>
          </div>
          <div class='col-xs-12 col-sm-2 col-md-2'>
            <a href='#'>
              <svg-icon icon-class='partner4' style='width: 96px; height: 32px'/>
            </a>
          </div>
          <div class='col-xs-12 col-sm-2 col-md-2'>
            <a href='#'>
              <svg-icon icon-class='partner5' style='width: 96px; height: 32px'/>
            </a>
          </div>
          <div class='col-xs-12 col-sm-2 col-md-2'>
            <a class='btn-partner' href='mailto:business@jokerfi.com'>Become a partner
              <svg-icon icon-class='arrow' style='width: 13px; height: 13px'/>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- START FOOTER SECTION -->
  <footer class='section-padding footer'>
    <div class='container' style='text-align: center; padding-top: 100px'>
      <div class='row'>
        <div style='display: inline-block;'>
          <svg-icon icon-class='jokermanor' style='width: 122px; height: 40px;'></svg-icon>
        </div>
      </div>
      <div class='row'
           style="font-size: 18px;font-weight: normal;font-family: 'Open Sans', sans-serif;line-height: 28px;color: #979797">
        <p>You can contact us with questions using the channel of your choice</p>
      </div>
      <div class='row'>
        <div class='col-md-12'>
          <a href='https://t.me/jokermanor' class='contact1'>
            <svg-icon icon-class='contact1' style="width: 43px;height: 42px"></svg-icon>
          </a>
          <a href='http://www.twitter.com/JokerManor' class='contact2'>
            <svg-icon icon-class='contact2' style="width: 43px;height: 42px"></svg-icon>
          </a>
          <a href='http://www.medium.com/@JokerManorMetaverse' class='contact3'>
            <svg-icon icon-class='contact3' style="width: 43px;height: 42px"></svg-icon>
          </a>
        </div>
      </div>
      <div class='row'>
        <div class='col-sm-4 col-md-4 col-sm-offset-4 col-md-offset-4 copyright'>
          <p>Copyright &copy; 2021.JokerManor</p>
        </div>
      </div>
    </div>
  </footer>
  <!-- Back to top -->
  <a href='#' class='back-to-top' id='back-to-top'> <i class='fa fa-chevron-up'
                                                       aria-hidden='true'></i>
  </a>
</template>


<script lang='ts'>
import { reactive } from 'vue';
import { defineComponent } from 'vue';
import SvgIcon from '@/components/SvgIcon.vue';

export default defineComponent({
  name: 'landingPage',
  components: { SvgIcon },
  setup() {
    const imageUrls = reactive({});
    return { imageUrls };
  },
});
</script>

<style scoped>

</style>
