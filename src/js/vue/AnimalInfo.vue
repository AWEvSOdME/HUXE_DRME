<template>

    <!--Wheatear INFO-->
    <div class="animalInfo" v-if="animal === 'Wheatear'">
        <p class="infoText">Wheatear INFO comes here ... :)</p>
    </div>

    <!--WhiteStork INFO-->
    <div class="animalInfo" v-else-if="animal === 'White Stork'">
        <p class="infoText">
            Der <b>Weißstorch</b> (Ciconia ciconia) ist eine Vogelart aus der Familie der Störche (Ciconiidae).
            <br><br><b>Gestalt und Lautäußerungen: <img class="animal_img_right" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Ciconia_ciconia_%28aka%29.jpg/300px-Ciconia_ciconia_%28aka%29.jpg" alt="Bild des Weißstorchs"/>
            </b><br>Weißstörche sind etwa 80 bis 100 cm lang und haben eine Flügelspannweite von etwa 200 bis 220 cm. Bis auf die schwarzen Schwungfedern ist das Federkleid rein weiß.
            Schnabel und Beine sind rötlich. Weißstörche haben ein Gewicht von etwa 2,5 bis 4,5 kg.<br>
            Da die Stimme des Weißstorchs nur schwach ausgeprägt ist, verständigt er sich durch Klappern mit dem Schnabel. Deshalb wird er auch Klapperstorch genannt.
            Geklappert wird zur Begrüßung des Partners am Nest und zur Verteidigung gegen Nestkonkurrenten.
            <img class="animal_img_left" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Klappern_des_weissstorches.jpg/220px-Klappern_des_weissstorches.jpg" alt="klappernder Weißstorch" style="width:260px; padding-top:8px;"/>
            <br><br><b>Zugverhalten: </b><br>Der Weißstorch ist ein Zugvogel, der jedes Jahr lange Strecken zwischen seinen Brutquartieren und seinen Winterquartieren in Afrika südlich der Sahara zurücklegt.
            Der Weißstorch ist ein Segelflieger, der zum Zug warme Aufwinde (Thermik) nutzt.
            So ziehen die so genannten „Weststörche“ bei Gibraltar über das Mittelmeer, um in Westafrika vom Senegal bis zum Tschadsee den Winter zu verbringen. Die „Oststörche“ ziehen über den Bosporus, das Jordantal und die Sinaihalbinsel nach Afrika.
            Sie fliegen das Niltal hinauf bis in den Sudan. Von dort aus geht der Zug weiter in Richtung Ostafrika.
            <img class="animal_img_right" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Ciconia_ciconia_-_01.jpg/220px-Ciconia_ciconia_-_01.jpg" alt="Weißstorch im Flug" style="width:110px;"/>
            Die Winterquartiere der „Oststörche“ befinden sich in Ostafrika bis Südafrika. Das ist eine Entfernung von etwa 10.000 km. Die Zugscheide verläuft etwa vom Alpennordrand über den Südwesten des Harzes, Osnabrück bis zum IJsselmeer.
            Nur wenige Vögel nehmen die mittlere Zugroute über Italien nach Tunesien. In den letzten Jahren ziehen viele Störche auf der westlichen Route nicht mehr bis nach Afrika, sondern bleiben in Spanien und Portugal.
            Zuletzt wurden auch echte Überwinterer beobachtet, so im Winter 2014/15 im Main-Kinzig-Kreis allein sechs Brutpaare.<br><br>
            <audio controls style="width: 260px; margin-bottom:10px;"><source src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Ciconia_ciconia_bill-clattering.ogg" type="audio/ogg">Ihr Browser unterstützt keine Audio-Formate.</audio>
        <a href="https://de.wikipedia.org/wiki/Wei%C3%9Fstorch" target="_blank" style="padding-bottom:15px;">Mehr Infos über den Weißstorch ...</a> </p>
    </div>

    <!--Black Stork INFO-->
    <div class="animalInfo" v-else-if="animal === 'Black Stork'">
        <p class="infoText">Black Stork INFO comes here ... :)</p>
    </div>

    <!--False Killer Whale INFO-->
    <div class="animalInfo" v-else-if="animal === 'False Killer Whale'">
        <p class="infoText">False Killer Whale INFO comes here ... :)</p>
    </div>

    <!--Agouti INFO-->
    <div class="animalInfo" v-else-if="animal === 'Agouti'">
        <p class="infoText">...Agouti INFO comes here ... :)</p>
    </div>

    <!--African Elephant INFO-->
    <div class="animalInfo" v-else-if="animal === 'African Elephant'">
        <p class="infoText">African Elephant INFO comes here ... :)</p>
    </div>

    <!--Lion INFO-->
    <div class="animalInfo" v-else-if="animal === 'Lion'">
        <p class="infoText">Lion INFO comes here ... :)</p>
    </div>

    <!--Ocelot INFO-->
    <div class="animalInfo" v-else-if="animal === 'Ocelot'">
        <p class="infoText">Ocelot INFO comes here ... :)</p>
    </div>

    <!--Black Skimmer INFO-->
    <div class="animalInfo" v-else-if="animal === 'Black Skimmer'">
        <p class="infoText">Black Skimmer INFO comes here ... :)</p>
    </div>

    <!--Nothing selected-->
    <div class="animalInfo" v-else>
        <p class="infoText">LALAAL</p>
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
        }
    }

</script>

