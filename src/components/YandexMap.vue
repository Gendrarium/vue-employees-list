<template>
  <div id="yandexMap" class="maps" />
</template>

<script setup lang="ts">
import { TLocation } from "@/interfaces";
import { YMapDefaultMarker } from "@yandex/ymaps3-types/packages/markers";
import { onMounted, ref, watch } from "vue";
import * as ymaps3 from "ymaps3";

const props = defineProps<{
  location?: TLocation;
  withChangeLocation: boolean;
}>();
const emit = defineEmits<{
  (e: "add-marker", newLocation: TLocation): void;
}>();

const globalMarker = ref<null | YMapDefaultMarker>(null);
const globalMap = ref<null | ymaps3.YMap>(null);

onMounted(() => {
  const mapDiv = document.querySelector(".maps") as HTMLElement;

  const yandexSetup = async () => {
    await ymaps3.ready;
    const {
      YMap,
      YMapDefaultSchemeLayer,
      YMapDefaultFeaturesLayer,
      YMapControls,
      YMapListener,
    } = ymaps3;

    // Create map
    const map = new YMap(mapDiv, {
      location: {
        center: props.location || [37.588144, 55.733842],
        zoom: 10,
      },
    });
    globalMap.value = map;
    map.addChild(new YMapDefaultSchemeLayer({}));
    map.addChild(new YMapDefaultFeaturesLayer({ zIndex: 1800 }));

    // import controls
    const { YMapZoomControl, YMapGeolocationControl } = await ymaps3.import(
      "@yandex/ymaps3-controls@0.0.1",
    );
    const controls = new YMapControls({ position: "right" });
    controls.addChild(new YMapZoomControl({}));
    if (props.withChangeLocation) {
      controls.addChild(new YMapGeolocationControl({}));
    }
    map.addChild(controls);

    // import marker
    const { YMapDefaultMarker } = await ymaps3.import(
      "@yandex/ymaps3-markers@0.0.1",
    );
    const marker = new YMapDefaultMarker({
      coordinates: props.location || [37.588144, 55.733842],
      color: "red",
    });
    globalMarker.value = marker;
    map.addChild(marker);

    // Add listener
    if (props.withChangeLocation) {
      const mapListener = new YMapListener({
        layer: "any",
        onClick: (_d, e) => {
          marker.update({
            coordinates: e.coordinates,
          });
          emit("add-marker", [...e.coordinates]);
        },
      });
      map.addChild(mapListener);
    }
  };

  yandexSetup();

  const locationWatch = watch(
    () => props.location,
    (newLoc) => {
      if (!newLoc || !globalMarker.value || !globalMap.value) return;
      globalMap.value.update({
        location: {
          center: newLoc,
        },
      });
      globalMarker.value.update({
        coordinates: newLoc,
      });
    },
  );

  if (props.withChangeLocation) {
    locationWatch();
  }
});
</script>

<style lang="scss">
.maps {
  width: 100%;
  height: 500px;
}
</style>
