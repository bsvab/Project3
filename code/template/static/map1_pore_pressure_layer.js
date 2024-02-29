// define pore pressure layer
fetch('/data')
    .then(response => response.json())
    .then(data => {
        // Process data received from the server
        console.log(data);

        let getInterval = function (feature) {
            let startTime = new Date(feature.properties["Time"]).getTime();
            let endTime = new Date(feature.properties["Time"]).getTime();
            return { start: startTime, end: endTime };
        };

        let timeline_pore_pressure = L.timeline(data, {
            getInterval: getInterval,
            pointToLayer: function (feature, latlng) {
                let pressure = feature.properties["Pressure"];
                // let radius = Math.max(3, Math.sqrt(volume) / 20); 
                // return L.circleMarker(latlng, { radius: radius }).bindPopup(`Volume Injected: ${volume} BBLs`);
            }
        });

        timelineControl.addTimelines(timeline_pore_pressure);
        timeline_pore_pressure.addTo(map1);

        //--------------------------------------------------
        
        var data = [
            { lat: 31.53370266496937, lon: -103.777418085535, value: 10 },
            { lat: 31.534198092955776, lon: -103.760445906687, value: 20 },
            // Add more data points as needed
        ];

        // Create hexbin layer
        let hexLayer = L.hexbinLayer({
            radius: 20,  // Adjust this value as needed
            opacity: 0.7,
            colorScaleExtent: [0, 100],  // Define the range of your numerical values
            colorRange: ['blue', 'red']  // Define the color gradient
        }).addTo(map1);

        // Add data to the hexbin layer
        hexLayer.data(data.map(function(d) {
            return [d.lat, d.lon, d.value];
        }));

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// --------------------------------------------------------------------------------------------------------------------------
// Roxana's injection code for reference......
// --------------------------------------------------------------------------------------------------------------------------

// fetch('../../data/injection_data_v2.geojson')
//     .then(response => response.json())
//     .then(data => {
//         let getInterval = function (feature) {
//             let startTime = new Date(feature.properties["Injection Date"]).getTime();
//             let endTime = new Date(feature.properties["Injection End Date"]).getTime();
//             return { start: startTime, end: endTime };
//         };

//         let timeline = L.timeline(data, {
//             getInterval: getInterval,
//             pointToLayer: function (feature, latlng) {
//                 let volume = feature.properties["Volume Injected (BBLs)"];
//                 let radius = Math.max(3, Math.sqrt(volume) / 20); 
//                 return L.circleMarker(latlng, { radius: radius }).bindPopup(`Volume Injected: ${volume} BBLs`);
//             }
//         });

//         // let timelineControl = L.timelineSliderControl({
//         //     formatOutput: function (date) {
//         //         return new Date(date).toDateString();
//         //     }
//         // });

//         // timelineControl.addTo(map1);
//         timelineControl.addTimelines(timeline);
//         timeline.addTo(map1);

//         // timeline.on('change', function () {
//         //     updateList(timeline);
//         // });
//     });

// --------------------------------------------------------------------------------------------------------------------------
// Code from 'earthquakes.html' file for reference.......
// --------------------------------------------------------------------------------------------------------------------------

// // eqfeed_callback is called once the earthquake geojsonp file below loads
// function eqfeed_callback(data) {
//     var getInterval = function (quake) {
//       // earthquake data only has a time, so we'll use that as a "start"
//       // and the "end" will be that + some value based on magnitude
//       // 18000000 = 30 minutes, so a quake of magnitude 5 would show on the
//       // map for 150 minutes or 2.5 hours
//       return {
//         start: quake.properties.time,
//         end: quake.properties.time + quake.properties.mag * 1800000,
//       };
//     };
//     var timelineControl = L.timelineSliderControl({
//       formatOutput: function (date) {
//         return new Date(date).toString();
//       },
//     });
//     var timeline = L.timeline(data, {
//       getInterval: getInterval,
//       pointToLayer: function (data, latlng) {
//         var hue_min = 120;
//         var hue_max = 0;
//         var hue =
//           (data.properties.mag / 10) * (hue_max - hue_min) + hue_min;
//         return L.circleMarker(latlng, {
//           radius: data.properties.mag * 3,
//           color: "hsl(" + hue + ", 100%, 50%)",
//           fillColor: "hsl(" + hue + ", 100%, 50%)",
//         }).bindPopup(
//           '<a href="' + data.properties.url + '">click for more info</a>'
//         );
//       },
//     });
//     timelineControl.addTo(map);
//     timelineControl.addTimelines(timeline);
//     timeline.addTo(map);
//     timeline.on("change", function (e) {
//       updateList(e.target);
//     });
//     updateList(timeline);
//   }