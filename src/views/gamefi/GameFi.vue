<template>
  <van-cell-group inset>
    <van-cell value='' label='' @click='' class='earning'>
      <template #title>
          <span class='cell-icon'>
          <svg-icon style='width:24px; height: 24px' icon-class='clarity_coin-bag-solid'></svg-icon>
        </span>
        <span class='earning-title'>GameFi Earning</span>
        <span class='earning-subtitle'>0&nbsp;JKT</span>
      </template>
      <template #value>
        <!-- <van-button round color='#CD2A16' hairline size='mini' class='earning-claimed'>To be claimed</van-button> -->
        <div class='earning-claimed'><span >To be claimed</span></div>
      </template>
    </van-cell>
  </van-cell-group>
  <van-list class='game-list'
            v-model="state.listLoad"
            :finished="state.finished"
            finished-text="no more"
            @load="onLoad"
  >
    <div class='game-li' v-for='(item, index) in list' :key='item.gameName'>
      <van-image :src='item.picUrl' class='game-pic'></van-image>
      <div class='game-info'>
        <span class='game-name'> {{item.gameName}} </span>
        <span class='game-power'>
          <svg-icon icon-class='thunder' style='width: 16px; height: 16px'></svg-icon>
          <span>
            Power: {{item.power}}
          </span>
          <van-button type='danger' class='game-btn' :disabled='(item.disabled)' :loading='false'
                      @click='toPlay(index)'>
            Play
          </van-button>
        </span>
        <span class='game-tags'>
          <van-tag class='tag' type='50' :mark='false' :plain='false' v-for='i in item.tags' :key='i'>{{i}}</van-tag>
        </span>
      </div>
    </div>
  </van-list>
  <note-popup :note-show='state.noteShow' :url='state.gameUrl' @noteClose='handleNoteClose'></note-popup>
</template>

<script lang='ts'>

  import { defineComponent, reactive, ref } from 'vue';
  import SvgIcon from '@/components/SvgIcon.vue';
  import NotePopup from '@/components/NotePopup.vue';
  import sweetChaseImage from '@/assets/images/gamefi/sweet-chase.png';
  import comingSoonImage1 from '@/assets/images/gamefi/coming-soon1.png';
  import comingSoonImage2 from '@/assets/images/gamefi/coming-soon2.png';
  import comingSoonImage3 from '@/assets/images/gamefi/coming-soon3.png';

  export default defineComponent({
    name: 'gameFi',
    components: { SvgIcon, NotePopup },
    setup() {
      const state = reactive({
        listLoad: false,
        finished: true,
        noteShow: false,
        gameUrl: '',
      });

      const list = ref();
      list.value = [
        {
          picUrl: sweetChaseImage,
          gameName: 'Sweet Chase',
          power: '100%',
          gameUrl: 'https://www.jokerfi.com/pumpingpig/',
          tags: [
            'NFT', 'Adventurer', 'Sweet',
          ],
          disabled: true,
        },
        {
          picUrl: comingSoonImage1,
          gameName: 'Coming Soon',
          power: '100%',
          gameUrl: '',
          tags: [
            'NFT', 'Metaverse', 'SSR Card',
          ],
          disabled: true,
        },
        {
          picUrl: comingSoonImage2,
          gameName: 'Coming Soon',
          power: '100%',
          gameUrl: '',
          tags: [
            'NFT', 'WAR', 'SSR Card',
          ],
          disabled: true,
        },
        {
          picUrl: comingSoonImage3,
          gameName: 'Coming Soon',
          power: '100%',
          gameUrl: '',
          tags: [
            'NFT', 'RBG', 'SSR Card',
          ],
          disabled: true,
        },
      ];

      function toPlay(index: number) {
        state.noteShow = true;
        state.gameUrl = list.value[index].gameUrl;
      }

      function handleNoteClose() {
        state.noteShow = false;
      }

      return { state, list, toPlay, handleNoteClose };
    },
  });
</script>

<style lang='scss'>
  .earning {
    color: #fff;
    background-color: $brand-red;
  }

  .earning .van-cell__title {
    flex: 1.5;
  }

  .earning-title {
    display: inline-block;
    margin-left: 13px;
    font-size: 16px;
    font-weight: 400;
  }

  .earning-subtitle {
    margin-left: 37px;
    font-size: 13px;
    font-weight: 600;
  }

  .earning-claimed {
    display: inline-block;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
    margin-top: 30px;
    padding-left: 8px;
    padding-right: 8px;
    border-style:solid;
    border-width: 1px;
    border-color: #FFFFFF;
    border-radius: 10px ;
  }

  .game-list {
    margin-top: 12px;

    .game-li {
      margin-bottom: 6px;
      padding: 0 16px;
      display: flex;
      justify-content: space-between;
    }

    .game-pic {
      width: 127px !important;
      height: 83px !important;
      max-width: 127px;
      max-height: 83px;
    }

    .game-info {
      flex: 204;
      padding-left: 12px;
    }

    .game-name {
      display: block;
      font-size: 15px;
      line-height: 18px;
      font-weight: 600;
    }

    .game-power {
      margin-top: 8px;
      font-size: 15px;
      line-height: 16px;
      font-weight: 400;
      display: flex;
      justify-content: space-between;
    }

    .game-btn {
      width: 71px;
      height: 24px;
      background-color: $brand-red;
      color: $white;
      font-size: 12px;
      line-height: 24px;
      font-weight: 600;
      border-radius: 4px;
    }

    .game-tags {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;

      .tag {
        font-size: 13px;
        line-height: 20px;
        color: #575962;
        padding: 4px 6px;
        text-align: center;
        background-color: #0E0F11;
      }
    }
  }
</style>
