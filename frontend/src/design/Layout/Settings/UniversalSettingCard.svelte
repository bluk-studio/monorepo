<script lang="ts">
  // Importing modules
  import type { SettingCard } from 'src/config';
  import { ESettingCardType } from 'src/config';

  // Importing different SettingCards
  import { TogglerSettingCard, InputSettingCard } from './SettingCards';

  export let card: SettingCard;
</script>

<!-- Determining which card we need to show -->
{ #if card?.type == ESettingCardType.TOGGLER }
  <TogglerSettingCard card={card} />
{ :else if card?.type == ESettingCardType.INPUT }
  <InputSettingCard card={card} />
{ /if }