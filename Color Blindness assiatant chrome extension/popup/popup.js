// document.getElementById('applyBtn').addEventListener('click', () => {
//   const filter = document.getElementById('filterSelect').value;
//   console.log(`Selected filter: ${filter}`);

//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     console.log('Active tab ID:', tabs[0].id);

//     chrome.scripting.executeScript({
//       target: { tabId: tabs[0].id },
//       func: applyFilter,
//       args: [filter]
//     }, (results) => {
//       if (chrome.runtime.lastError) {
//         console.error('Script execution error:', chrome.runtime.lastError);
//       } else {
//         console.log('Script executed successfully:', results);
//       }
//     });
//   });
// });

// function applyFilter(filter) {
//   console.log(`Applying filter: ${filter}`);

//   const filterId = filter ? `url(#${filter}-filter)` : 'none';
//   console.log(`Filter ID: ${filterId}`);
//   document.body.style.filter = filterId;

//   if (!document.getElementById('color-blindness-filters')) {
//     const svgFilters = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;" id="color-blindness-filters">
//       <filter id="protanopia-filter">
//         <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0
//                                              0.558, 0.442, 0, 0, 0
//                                              0, 0.242, 0.758, 0, 0
//                                              0, 0, 0, 1, 0" />
//       </filter>
//       <filter id="deuteranopia-filter">
//         <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0
//                                              0.7, 0.3, 0, 0, 0
//                                              0, 0.3, 0.7, 0, 0
//                                              0, 0, 0, 1, 0" />
//       </filter>
//       <filter id="tritanopia-filter">
//         <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0
//                                              0, 0.433, 0.567, 0, 0
//                                              0, 0.475, 0.525, 0, 0
//                                              0, 0, 0, 1, 0" />
//       </filter>
//       <filter id="none-filter">
//         <feColorMatrix type="matrix" values="1, 0, 0, 0, 0
//                                              0, 1, 0, 0, 0
//                                              0, 0, 1, 0, 0
//                                              0, 0, 0, 1, 0" />
//       </filter>
//     </svg>`;
//     document.body.insertAdjacentHTML('beforeend', svgFilters);
//     console.log('SVG filters inserted');
//   }
// }

document.getElementById('applyBtn').addEventListener('click', () => {
  const filter = document.getElementById('filterSelect').value;
  console.log(`Selected filter: ${filter}`);

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    console.log('Active tab ID:', tabs[0].id);

    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: applyFilter,
      args: [filter]
    }, (results) => {
      if (chrome.runtime.lastError) {
        console.error('Script execution error:', chrome.runtime.lastError);
      } else {
        console.log('Script executed successfully:', results);
      }
    });
  });
});

function applyFilter(filter) {
  console.log(`Applying filter: ${filter}`);

  const filterId = filter === 'none' ? 'none' : `url(#${filter}-filter)`;
  console.log(`Filter ID: ${filterId}`);
  document.documentElement.style.filter = filterId;
}