<script lang="ts">
    type Props = {
        careerId: number;
        selected?: boolean;
        handler?: (careerId: number) => void;
        class?: string;
    }

    const { careerId, selected = false, handler, class: CLASS = '' }: Props = $props();

</script>


<!-- Add CSS variable like --mobile-icon-url to use as background image when browsing from mobile -->
<span class="career-icon border-02 w-full h-full {selected ? 'selected' : ''} {CLASS}"
      style="background-image: url('/images/careers/{careerId}/portrait.png')">
</span>

<style>    
    span.career-icon {
        display: block;
        background-size: cover;
        background-position: center;
    }
</style>