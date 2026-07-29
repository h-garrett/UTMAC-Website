
const albumImages = [
    "../covers/3dcountry.jpg",
    "../covers/1000_gec_album.jpg",
    "../covers/1999_Joey_Badass.jpg",
    "../covers/Ants_from_Up_There_-_Black_Country,_New_Road.jpg",
    "../covers/Björk_-_Vespertine_album_cover.jpg",
    "../covers/Cocteau_Twins—Heaven_or_Las_Vegas.jpg",
    "../covers/Dream_Theater_-_Metropolis_Pt._2-_Scenes_from_a_Memory.jpg",
    "../covers/Ego_Death_at_a_Bachelorette_Party_-_Hayley_Williams.jpg",
    "../covers/there-is-love-in-you.jpg",
    "../covers/habibifunk.jpg",
    "../covers/In_the_aeroplane_over_the_sea.jpg",
    "../covers/Lanquidity.jpg",
    "../covers/Mmfood.jpg",
    "../covers/ModalMusic.jpg",
    "../covers/Superunknown.jpg",
    "../covers/SystemofaDownToxicityalbumcover.jpg",
    "../covers/The_Glow_pt._2.jpg",
    "../covers/The_Sky's_Gone_Out.jpg",
    "../covers/Three_cheers_clean.jpg",
    "../covers/Titanic_Rising.jpg",
    "../covers/Travellingwithoutmoving.jpg",
    "../covers/Velvet_Underground_and_Nico.jpg",
    "../covers/Violent_Femmes.jpg",
    "../covers/Will_Wood_-_The_Normal_Album.jpg"
]


const grid = document.querySelector("#album-grid");

albumImages.forEach(file => {
    const img = document.createElement("img");

    img.src = `images/albums/${file}`;
    img.alt = "";
    img.loading = "lazy";

    grid.appendChild(img);
});