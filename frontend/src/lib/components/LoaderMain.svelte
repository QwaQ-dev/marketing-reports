<script>
     import commonStore from "../../stores/commonStore";
</script>

{#if $commonStore.isLoading}
     <div class="SpinnerCircle">
          <div class="loader"/>
     </div>
{/if}

<style>
     .SpinnerCircle {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: #00000075;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
     }
     
    .loader {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        display: inline-block;
        border-top: 8px solid #FFF;
        border-right: 8px solid transparent;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
    }
    .loader::after {
        content: '';
        box-sizing: border-box;
        position: absolute;
        left: 0;
        top: 0;
        width: 72px;
        height: 72px;
        border-radius: 50%;
        border-left: 8px solid #FF3D00;
        border-bottom: 8px solid transparent;
        animation: rotation 0.5s linear infinite reverse;
    }
    @keyframes rotation {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }




</style>
