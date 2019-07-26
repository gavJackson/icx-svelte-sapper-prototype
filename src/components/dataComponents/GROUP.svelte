<script>
	import DCRenderer from './../DCRenderer.svelte'

	export let DisplayTypeShortCode;
	export let ShortCode;
	export let Label;
	export let children;
	export let CSSClass;

</script>

<div class="group-container {CSSClass}" data-short-code="{ShortCode}">
	<div class="group-children">
		{#each children as item}
			<DCRenderer class="group-child" {...item}/>

		{/each}
	</div>
</div>


<style lang="less" type="text/less">
// in order to preserve the styles i have had to make them global
:global(html){

    .group-card{
        background-color: white;
        padding: 2em;

        -webkit-box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.125);
        -moz-box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.125);
        box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.125);
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        -moz-background-clip: padding;
        -webkit-background-clip: padding-box;
        background-clip: padding-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        -ms-box-sizing: border-box;
        -o-box-sizing: border-box;
        box-sizing: border-box;
        margin-bottom: 20px;
    }


    ///////////////////////////////////////////////////////////
    //
    // columns
    //
    ///////////////////////////////////////////////////////////



    @megaWidth: 1800px;
    @largeWidth: 1200px;
    @defaultWidth: 980px;
    @tabletWidth: 768px;
    @phoneWidth: 480px;

    @borderColor: #ccc;

    ///////////////////////////////
    // mixins
    ///////////////////////////////

    .columns-4{
        & > .group-children {
            display: grid;
            grid-template-columns: 23% 23% 23% 23%;	// i know this doesnt add up to 100% but if each column is 25% it goes off the end!
            grid-column-gap: 20px;
            grid-row-gap: 10px;

            & > .group-child{
                height: 100%;

                & > div:not(.is-full-width){
                    height: 100%;

                    & > .group-card{
                        height: 100%;
                    }
                }

                &.is-full-width {
                    grid-column: span 4;
                    height: auto;
                }
            }
        }
    }

    .columns-3{
        & > .group-children {

            display: grid;

            grid-template-columns: 32% 32% 32%;	// if it adds up to 100% we get a bit of overflow!
            grid-column-gap: 20px;
            grid-row-gap: 10px;

            & > .group-child{
                height: 100%;

                & > div:not(.is-full-width){
                    height: 100%;

                    & > .group-card{
                        height: 100%;
                    }
                }

                &.is-full-width {

                    grid-column: span 3;
                    height: auto;
                }
            }
        }
    }

    .columns-2{
        & > .group-children {
            display: grid;
            grid-template-columns: 49% 49%; 	// if it adds up to 100% we get a bit of overflow!
            grid-column-gap: 20px;
            grid-row-gap: 10px;

            & > .group-child {
                height: 100%;

                & > div:not(.is-full-width) {
                    height: 100%;

                    & > .group-card {
                        height: 100%;
                    }
                }

                &.is-full-width {
                    grid-column: span 2;
                    height: auto;
                }
            }
        }
    }

    .columns-1{
        & > .group-children {
            display: grid;
            grid-template-columns: 99%;	// if it adds up to 100% we get a bit of overflow!
            grid-row-gap: 10px;
            grid-column-gap: 0px;

            & > .group-child {
                height: auto;

                & > div:not(.is-full-width) {
                    height: auto;

                    & > .group-card {
                        height: auto;
                    }
                }

                &.is-full-width {
                    grid-column: span 1;
                    height: auto;
                }
            }
        }
    }


    ///////////////////////////////
    // grid implementation
    ///////////////////////////////

    .group-container{

        ///////////////////////////////
        // 2 columns (using CSS grid)
        ///////////////////////////////

        &.has-2-columns {
            .columns-2;

            @media (max-width: @phoneWidth) {
                .columns-1;
            }

            &.each-column-has-2-columns{
                @media (max-width: @defaultWidth) {
                    .columns-1;

                    // turns a left separator line into a top separator line
                    .bordered-left{
                        border-left: none;
                        padding-top: 20px;

                        &:before{
                            content: '-';
                            font-size: 0;
                            display: block;
                            position: absolute;
                            left: 20px;
                            right: 20px;
                            height: 1px;
                            background-color: @borderColor;
                            margin-top: -20px;
                        }

                        &.group-container{
                            padding-left: 0px;
                            margin-left: 0px;
                            margin-top: 20px;
                        }
                    }
                }

            }

            &.each-column-has-1-columns{
                @media (max-width: @tabletWidth) {
                    .columns-1;
                }

            }
        }

        ///////////////////////////////
        // 3 columns (using CSS grid)
        ///////////////////////////////

        &.has-3-columns {
            .columns-3;

            @media (max-width: @tabletWidth) {
                .columns-2;

            }

            @media (max-width: @phoneWidth) {
                .columns-1;
            }

        }
        ///////////////////////////////
        // 4 columns (using CSS grid)
        ///////////////////////////////

        &.has-4-columns {
            .columns-4;

            @media (max-width: @defaultWidth) {
                .columns-3;

            }

            @media (max-width: @tabletWidth) {
                .columns-2;

            }

            @media (max-width: @phoneWidth) {
                .columns-1;
            }
        }
    }
}


</style>