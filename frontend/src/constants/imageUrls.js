// Import images from assets
import sourdoughBread from '../assets/images/recipes/sourdough-bread.jpg';
import croissants from '../assets/images/recipes/croissants.jpg';
import chocolateBabka from '../assets/images/recipes/chocolate-babka.jpg';
import artisanBread from '../assets/images/recipes/artisan-bread.jpg';
import frenchBaguettes from '../assets/images/recipes/french-baguettes.jpg';
import cinnamonRolls from '../assets/images/recipes/cinnamon-rolls.jpg';

import sarahAvatar from '../assets/images/avatars/sarah-baker.jpg';
import michelAvatar from '../assets/images/avatars/michel-laurent.jpg';
import rachelAvatar from '../assets/images/avatars/rachel-green.jpg';
import defaultAvatar from '../assets/images/avatars/default-avatar.jpg';

import bakingBanner from '../assets/images/banners/baking-banner.jpg';
import breadBanner from '../assets/images/banners/bread-banner.jpg';
import pastryBanner from '../assets/images/banners/pastry-banner.jpg';


export const IMAGE_URLS = {
  recipes: {
    sourdoughBread,
    croissants,
    chocolateBabka,
    artisanBread,
    frenchBaguettes,
    cinnamonRolls,
    defaultRecipe: artisanBread
  },
  avatars: {
    sarah: sarahAvatar,
    michel: michelAvatar,
    rachel: rachelAvatar,
    default: defaultAvatar
  },
  banners: {
    baking: bakingBanner,
    bread: breadBanner,
    pastry: pastryBanner,
    default: bakingBanner
  }
}; 