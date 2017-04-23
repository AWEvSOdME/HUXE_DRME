<template>

    <!--Wheatear INFO-->
    <div class="animalInfo" v-if="animal === 'Wheatear'">
        <p class="infoText">The <b>northern wheatear</b> or wheatear <b>(Oenanthe oenanthe)</b> is a small passerine bird that was formerly
        classed as a member of the thrush family Turdidae, but is now more generally considered to be an Old World flycatcher, Muscicapidae.
        <br><br>
        <b>Description: </b> <img class="animal_img_right" src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Stenskv%C3%A4tta_-_Oenanthe_oenanthe.jpg" alt="picture of northern oenanthe oenanthe" style="width:180px;" /><br>
        The northern wheatear is larger than the European robin at 14½–16 cm length. Both sexes have a white rump and tail, with a black inverted T-pattern at the end of the tail.
        The plumage of the summer male has grey upperparts, buff throat and black wings and face mask. In autumn it resembles the female apart from the black wings. The female is pale
        brown above and buff below with darker brown wings. The male has a whistling, crackly song. Its call is a typical chat chack noise, and the flight call is the same.<br>
        <img class="animal_img_left" src="https://upload.wikimedia.org/wikipedia/commons/1/17/Northern_wheatear_Oenanthe_oenanthe.jpg" alt="white stork" style="width:200px; padding-top:8px;"/><br><b>Migration: </b>  <br>The northern wheatear makes one of the longest journeys of any small bird, crossing ocean, ice, and desert. It migrates from Sub-Saharan Africa in spring over a vast
        area of the Northern Hemisphere that includes northern and central Asia, Europe, Greenland, Alaska, and parts of Canada. In autumn all return to Africa, where their ancestors had wintered. Arguably,
        some of the birds that breed in north Asia could take a shorter route and winter in south Asia; however, their inherited inclination to migrate takes them back to Africa.<br><br>
        <a href="https://en.wikipedia.org/wiki/Northern_wheatear" target="_blank" style="padding-bottom:15px;">More Infos about the northern wheatear...</a> </p>




    </div>

    <!--WhiteStork INFO-->
    <div class="animalInfo" v-else-if="animal === 'White Stork'">
        <p class="infoText">
            The <b>white stork</b> (Ciconia ciconia) is a large bird in the stork family <b>Ciconiidae</b>.
            <br><br><b>Description: <img class="animal_img_right" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Ciconia_ciconia_%28aka%29.jpg/300px-Ciconia_ciconia_%28aka%29.jpg" alt="Bild des Weißstorchs" style="width:100px;"/>
            </b><br>The white stork is a large bird. It has a length of 100–115 cm (39–45 in),and a standing height of 100–125 cm (39–49 in).
            he wingspan is 155–215 cm (61–85 in) and its weight is 2.3–4.5 kg (5.1–9.9 lb). Like all storks, it has long legs, a long neck and a long straight pointed beak.
            The sexes are identical in appearance, except that males are larger than females on average.
            The plumage is mainly white with black flight feathers and wing coverts; the black is caused by the pigment melanin.<br>
            <img class="animal_img_left" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Klappern_des_weissstorches.jpg/220px-Klappern_des_weissstorches.jpg" alt="white stork" style="width:260px; padding-top:8px;"/>
            <br><b>Distribution and habitat: </b><br>The nominate race of the white stork has a wide although disjunct summer range across Europe, clustered in the Iberian Peninsula and North Africa in the west,
            and much of eastern and central Europe, with 25% of the world's population concentrated in Poland, as well as parts of western Asia. The asiatica population of about 1450 birds is restricted to a region in
            central Asia between the Aral Sea and Xinjiang in western China. The Xinjiang population is believed to have become extinct around 1980. Migration routes extend
            the range of this species into many parts of Africa and India. Some populations adhere to the eastern migration route, which passes across Israel into eastern and central Africa.
            <br><br>
        <a href="https://en.wikipedia.org/wiki/White_stork" target="_blank" style="padding-bottom:15px;">More Infos about the white stork ...</a> </p>
    </div>

    <!--Black Stork INFO-->
    <div class="animalInfo" v-else-if="animal === 'Black Stork'">
        <p class="infoText"><b>The black stork</b> (Ciconia nigra) is a large wading bird in the stork family <b>Ciconiidae</b>.<br><br>It is a widespread, but uncommon,
        species that breeds in the warmer parts of Europe (predominantly in central and eastern regions), across temperate Asia and Southern Africa. This is a shy and wary species, unlike the closely related white stork.
        It is seen in pairs or small flocks—in marshy areas, rivers or inland waters. The black stork feeds on amphibians and insects.<br><br>
        <img class="animal_img_right" src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Ciconia_nigra_-Kruger_National_Park-8.jpg" alt="picture of a black stork"/><b>Description:</b><br>
        Slightly smaller than the white stork, the black stork is a large bird, 95 to 100 cm (37 to 39 in) in length with a 145–155 cm (4.76–5.09 ft) wingspan,
        and weighing around 3 kg (6.6 lb). They can stand as tall as 102 cm (40 in). Like all storks, it has long legs, a long neck, and a long, straight, pointed beak.
        The plumage is all black with a purplish green sheen, except for the white lower breast, belly, axillaries and undertail coverts. The breast feathers are long and shaggy forming a ruff which
        is used in some courtship displays. The bare skin around its eyes is red, as are its red bill and legs. The sexes are identical in appearance, except that males are larger than females on average.
        <br><img class="animal_img_left" src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Ciconia_nigra_-Dierenrijk_Europa%2C_Nuenen%2C_Noord-Brabant%2C_Netherlands-8a.jpg" style="width:220px;"/>
        <br><b>Distribution and habitat:</b>
        During the summer, the black stork is found from Eastern Asia (Siberia and China) west to Central Europe, reaching Estonia in the north, Poland, Lower Saxony and Bavaria in Germany, the Czech Republic, Hungary, Italy and Greece in the south, with an outlying population in Spain and Portugal.
        They are not abundant in these western parts of their distribution, but more densely inhabit the eastern Transcaucasus. A population of black storks is also resident in Southern Africa.
        <br><br><a href="https://en.wikipedia.org/wiki/Black_stork" target="_blank" style="padding-bottom:15px;">More Infos about the black stork ...</a> </p>

    </div>

    <!--False Killer Whale INFO-->
    <div class="animalInfo" v-else-if="animal === 'False Killer Whale'">
        <p class="infoText">The<b> false killer whale</b> <i>(Pseudorca crassidens)</i> is the fourth-largest dolphin, a member of Delphinidae, the oceanic dolphin family.<br><br>It lives in temperate and tropical
         waters throughout the world. As its name implies, the false killer whale shares characteristics with the more widely known killer whale (Orcinus orca), though the species belong to different genera within Delphinidae;
         as well as similarities in appearance, both species attack and kill other marine mammals.<br><br>
            <img class="animal_img_right" src="https://upload.wikimedia.org/wikipedia/commons/7/76/False_killer_whale_890002.jpg" alt="false killer whale" style="width:200px;"/><b>Population and distribution:</b><br>
            The false killer whale appears to have a widespread, if small, presence in tropical and semitropical oceanic waters. A few have been found in temperate water, but these are probably stray individuals.
            Their most common habitat is the open ocean, though they also frequent other areas. They have been sighted in fairly shallow waters such as the Mediterranean Sea and Red Sea, as well as the Atlantic Ocean
            (from Scotland to Argentina), the Indian Ocean (in coastal regions and around the Lakshadweep Islands), the Pacific Ocean (from the Sea of Japan to New Zealand and the tropical area of the eastern side),
            and in Hawaii. Recently, a pod of false killer whales was observed hunting down a small species of shark in Australia.
             <img class="animal_img_left" src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Cetacea_range_map_False_Killer_Whale.PNG" style="width:260px;"/>
            <br><br>The Hawaiian populations are the most studied groups of false killer whales. The three distinct groups in the islands are an offshore population, a
            orthwestern Hawaiian Island group, and a small group around the main Hawaiian Islands. This last group, a unique, small, insular population, is genetically distinct from the other populations.
            <br><br>
            <a href="https://en.wikipedia.org/wiki/False_killer_whale" target="_blank" style="padding-bottom:15px;">More Infos about the false killer whale ...</a> </p>
    </div>

    <!--Agouti INFO-->
    <div class="animalInfo" v-else-if="animal === 'Agouti'">
        <p class="infoText">The term <b>agouti</b> (Spanish: agutí, Spanish pronunciation: [aɣuˈti]) or <b>common agouti</b> designates several rodent species of the genus Dasyprocta.<br><br>
            <img class="animal_img_right" src="https://upload.wikimedia.org/wikipedia/commons/7/73/Agouti_.jpg" alt="common agouti" style="width:260px;"/><b>Distribution and description:</b><br>
            They are native to Middle America, northern and central South America, and the southern Lesser Antilles. Some species have also been introduced elsewhere in the West Indies.
            They are related to guinea pigs and look quite similar, but are larger and have longer legs. The species vary considerably in colour, being brown, reddish, dull orange, greyish or
            blackish, but typically with lighter underparts. Their bodies are covered with coarse hair which is raised when alarmed. They weigh 2.4–6 kg (5.3–13.2 lb) and are 40.5–76 cm (15.9–29.9 in)
            in length, with short, hairless tails. Confusingly, the related pacas were placed by some authorities in a genus called Agouti, though Cuniculus has priority and is the correct term.
            In Mexico, the agouti is called a sereque.<br><br>
            <b>Habits:</b>
            <br>Agoutis are found in forested and wooded areas in Central and South America. Their habitats include rainforests, savannas and, nowadays, cultivated fields, depending
            on the species. They conceal themselves at night in hollow tree trunks or in burrows among roots. Active and graceful in their movements, their pace is either a kind of trot
             or a series of springs following one another so rapidly as to look like a gallop. They take readily to water, in which they swim well.
            <br><br>
            <a href="https://en.wikipedia.org/wiki/Common_agouti" target="_blank" style="padding-bottom:15px;">More Infos about the common agouti ...</a> </p>
    </div>

    <!--African Elephant INFO-->
    <div class="animalInfo" v-else-if="animal === 'African Elephant'">
        <p class="infoText"><b>African elephants</b> are elephants of the genus Loxodonta, from Greek λοξός (loxós 'slanting, crosswise, oblique sided') + ὀδούς (odoús, stem odónt-, 'tooth').
        The genus consists of two extant species: the African bush elephant, L. africana, and the smaller African forest elephant, L. cyclotis. Loxodonta is one of two existing genera of the family Elephantidae.<br><br>
            <img class="animal_img_right" src="https://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg" alt="african elephant" style="width:160px;"/><b>Description:</b><br>
            One species of African elephant, the bush elephant, is the largest living terrestrial animal, while the forest elephant is the third-largest. Their thickset bodies rest on stocky legs,
             and they have concave backs. Their large ears enable heat loss.
             The upper lip and nose form a trunk. The trunk acts as a fifth limb, a sound amplifier, and an important method of touch. In L. africana, males stand 3.2–4.0 m (10–13 ft)
             tall at the shoulder and weigh 4,700–6,048 kg (10,360–13,330 lb), while females stand 2.2–2.6 m (7–9 ft) tall and weigh 2,160–3,232 kg (4,762–7,125 lb); L. cyclotis is
             smaller with male shoulder heights of up to 2.5 m (8 ft). The largest recorded individual
              stood 4 m (13.1 ft) at the shoulders and weighed 10 tonnes (10 long tons; 11 short tons).<br><br>
            <img class="animal_img_left" src="https://upload.wikimedia.org/wikipedia/commons/e/ef/African_Elephant_distribution_map.svg" style="width:180px;"/>
            <b>Habitat:</b>
            <br>African elephants are found widely in Sub-Saharan Africa, in dense forests, mopane and miombo woodlands, Sahelian scrub, or deserts.
            <br><br>
            <a href="https://en.wikipedia.org/wiki/African_elephant" target="_blank" style="padding-bottom:15px;">More Infos about the african elephant ...</a> </p>
    </div>

    <!--Lion INFO-->
    <div class="animalInfo" v-else-if="animal === 'Lion'">
        <p class="infoText">The <b>lion</b> (Panthera leo) is one of the big cats in the genus Panthera and a member of the family Felidae.<br><br>
            <img class="animal_img_right" src="https://upload.wikimedia.org/wikipedia/commons/c/c6/Okonjima_Lioness.jpg" alt="the lion sleeps tonight" style="width:220px;"/><b>Description:</b><br>
            The commonly used term African lion collectively denotes the several subspecies in Africa. With some males exceeding 250 kg (550 lb) in weight,it is the second-largest living cat after
             the tiger, barring hybrids like the liger. Wild lions currently exist in sub-Saharan Africa and in India (where an endangered remnant population resides in and around Gir Forest National Park).
              In ancient historic times, their range was in most of Africa, including North Africa, and across Eurasia from Greece and southeastern Europe to India. In the late Pleistocene,
            about 10,000 years ago, the lion was the most widespread large land mammal after humans: Panthera leo spelaea lived in northern and western Europe and Panthera leo atrox lived in the Americas from the Yukon to Peru.<br><br>
            <img class="animal_img_left" src="https://upload.wikimedia.org/wikipedia/commons/7/7d/Lion_distribution.png" style="width:200px;"/>
            <b>Habitat:</b>
            <br>In Africa, lions can be found in savanna grasslands with scattered Acacia trees, which serve as shade; their habitat in India is a mixture of dry savanna forest and very dry deciduous scrub forest.
             The habitat of lions originally spanned the southern parts of Eurasia, ranging from Greece to India, and most of Africa except the central rainforest-zone and the Sahara desert. Herodotus reported that
             lions had been common in Greece in 480 BC; they attacked the baggage camels of the Persian king Xerxes on his march through the country. Aristotle considered them rare by 300 BC. By 100 AD they were extirpated.
             A population of Asiatic lions survived until the tenth century in the Caucasus, their last European outpost.<br>
            In the Jungle the mighty jungle the lion sleeps tonight. Near the village the peaceful village the lion sleeps tonight. OWEEHHHh AWIBOLE AWIBOLE
            The species was eradicated from Palestine by the Middle Ages and from most of the rest of Asia after the arrival of readily available firearms in the eighteenth century. Between the late nineteenth and early twentieth centuries,
           they became extinct in North Africa and Southwest Asia. By the late nineteenth century, the lion had disappeared from Turkey and most of northern India, while the last sighting of a live Asiatic lion
           in Iran was in 1941 (between Shiraz and Jahrom, Fars Province), although the corpse of a lioness was found on the banks of the Karun river, Khūzestān Province in 1944. There are no subsequent reliable reports
            from Iran. The subspecies now survives only in and around the Gir Forest of northwestern India. Approximately 500 lions live in the area of the 1,412 km2 (545 sq mi)
            sanctuary in the state of Gujarat, which covers most of the forest. Their numbers have increased from 180 to 523 animals mainly because the natural prey species have recovered.
            <br><br>
            <a href="https://en.wikipedia.org/wiki/Lion" target="_blank" style="padding-bottom:15px;">More Infos about the lion ...</a> </p>
    </div>

    <!--Ocelot INFO-->
    <div class="animalInfo" v-else-if="animal === 'Ocelot'">
        <p class="infoText">The <b>ocelot</b> (Leopardus pardalis; /ˈɒsəlɒt/), also known as the <b>dwarf leopard</b>, is a wild cat distributed extensively within South America, including the islands of Trinidad and Margarita,
        Central America, and Mexico.<br><br>
            <img class="animal_img_right" src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Ocelot_%28Jaguatirica%29_Zoo_Itatiba.jpg" alt="Ocelot" style="width:220px;"/><b>Description:</b><br>
            The ocelot is a member of the genus Leopardus and is classified under the family Felidae. The ocelot was first described by Swedish zoologist Carl Linnaeus in the 10th edition of Systema Naturae (1758)
             as Felis pardalis, placing it in the genus Felis along with the domestic cat, Eurasian lynx, jaguar, leopard, lion and tiger.
             The name ocelot comes from the Nahuatl word ōcēlōtl (pronounced [oːˈseːloːt͡ɬ]), which usually refers to the jaguar (Panthera onca) rather than the ocelot<br><br>
            <b>Distribution and habitat: </b>
            <img class="animal_img_left" src="https://upload.wikimedia.org/wikipedia/commons/7/72/Ocelot_area.png" style="width:200px;"/>
            <br> The ocelot is distributed extensively over South America, including the Margarita and Trinidad islands, Central America, Mexico and a small population in southern Texas.Countries in this range are:
            Argentina, Belize, Bolivia, Brazil, Colombia, Costa Rica, Ecuador,
             El Salvador, Guatemala, Guyana, Honduras, Mexico, Nicaragua, Panama, Paraguay, Peru, Suriname, Trinidad and Tobago, United States and Venezuela. The cat is likely extinct in Uruguay.
            It inhabits tropical forest, thorn forest, mangrove swamps and savanna at elevations up to 1,200 m (3,900 ft). It prefers areas with relatively dense vegetation cover, but occasionally also hunts in more open areas at night.
            The ocelot once inhabited the chaparral thickets of the Gulf Coast of south and eastern Texas, and could be found in Arizona, Louisiana, and Arkansas. In the United States, it now ranges only in several small areas of
            dense thicket in South Texas and is rarely sighted in Arizona. On November 7, 2009, an ocelot was photographed in the mountains of Cochise County, Arizona. This was the first such verifiable evidence of the feline's presence
            in the state. In February 2011, the Arizona Game and Fish Department confirmed the sighting of another ocelot in the Huachuca Mountains of southern Arizona.
            Most surviving Texas ocelots are in the shrublands remaining at or near the Laguna Atascosa National Wildlife Refuge near Brownsville, where only 30-35 animals remain.
            <br><br>
            <a href="https://en.wikipedia.org/wiki/Ocelot" target="_blank" style="padding-bottom:15px;">More Infos about the ocelot ...</a> </p>
    </div>

    <!--Black Skimmer INFO-->
    <div class="animalInfo" v-else-if="animal === 'Black Skimmer'">
        <p class="infoText">The <b>black skimmer</b> (Rynchops niger) is a tern-like seabird, one of three very similar birds species in the skimmer genus Rynchops in the gull family Laridae.<br><br>
            <img class="animal_img_right" src="https://upload.wikimedia.org/wikipedia/commons/3/39/Black_skimmer_Rynchops_niger.jpg" alt="black skimmer" style="width:260px;"/><b>Description:</b><br>
            The black skimmer is the largest of the three skimmer species. It measures 40–50 cm (16–20 in) long with a 107–127 cm (42–50 in) wingspan.
            This species ranges from 212 to 447 g (7.5 to 15.8 oz), with males averaging about 349 g (12.3 oz), as compared to the smaller female’s 254 g (9.0 oz). The basal half of the bill is red, the rest
             mainly black, and the lower mandible is much-elongated.
            The eye has a dark brown iris and catlike vertical pupil, unique for a bird. The legs are red. The call is a barking kak-kak-kak.<br><br>
            <b>Breeding:</b>
            <br>The black skimmer breeds in loose groups on sandbanks and sandy beaches in the Americas, the three to seven heavily dark-blotched buff or bluish eggs being incubated by both the male and female.
             The chicks leave the nest as soon as they hatch and lie inconspicuously in the nest depression or "scrape" where they are shaded from high temperatures by the parents.
            <br><br>
            <a href="https://en.wikipedia.org/wiki/Black_skimmer" target="_blank" style="padding-bottom:15px;">More Infos about the black skimmer ...</a> </p>
    </div>

    <!--ADDING Info-->
    <div class="animalInfo" v-else-if="animal === 'add'">

        <p class="infoText"><b>To add data please do the following steps:</b><br><br>


            - Choose the class of the animal you want to add<br><br>
            - Enter the necessary data in the form<br><br>
            - Click the <b>'ADD'</b> button<br><br>
            - Now you can drag the marker around and set it to its final location<br><br>
            - Click the <b>'SAVE'</b> to store the Data in your Map


        </p>


    </div>

    <!--ADDING Info-->
    <div class="animalInfo" v-else-if="animal === 'delete'">
        <p class="infoText"><b>Here the delete function is going to happen ... soon</b><br><br>



        </p>
    </div>

    <!--Nothing selected-->
    <div class="animalInfo" v-else>
        <p class="infoText"><b>Welcome to ANCKS - the animal tracks database</b><br><br>

            This website was designed to easily request animal tracking data from <a href="http://www.movebank.org" target="_blank">movebank.org</a>.<br>
            On the map you can see (f.e.) where birds migrate to during winter, or where elephants go to drink water.<br><br>

            You observe animals as a hobby or for a living?
            This SPA offers you a easy and efficient way to store your sightings direct in a database and visualizes them on a map.<br><br>

            Before you start please make sure that:<br><br>

             - You have a movebank account and access to the studies used on this page<br>
             - You created a account and you are logged in<br>
             - ????<br>
             - Profit<br>
             </p>




    </div>
</template>


<script>

    export default {
        props: {
            animal: {
                type: String,
                required: true
            },
        },
        watch: {
            animal (animal) {
                console.log(animal)
            },
        },

    }

</script>

