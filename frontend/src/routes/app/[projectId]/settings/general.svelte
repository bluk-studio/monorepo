<script lang="ts">
  // Importing modules
  import { UniversalSettingCard } from 'src/design';
  import { GeneralSettings } from 'src/config';
</script>

<!-- Content -->
<section class="w-full flex flex-wrap items-stretch">
  { #each GeneralSettings as setting }
    <UniversalSettingCard card={setting} />
  { /each }
</section>