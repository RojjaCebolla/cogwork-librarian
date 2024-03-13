import React from 'react'

const widgetStyle = `
:root {
  --shadow: #0e0e0e;
  --bg-fill:  var(--darkest-color);
  --ripple-stroke: #19143e;
  --random-stroke:  var(--green);
  --tube-fill:  #970202;
  --chain-fill:  #dd8903;
  --tube-stroke:  var(--active);
}
.iwroot {
  font-family: Helvetica, Arial, sans-serif;
}
.iwroot .shadow {
  var(--shadow);
}
.iwroot .buoy {
  stroke-width: 2;
  stroke: var(--tube-stroke);
  fill: var(--tube-fill);
}
.iwroot .tube {
  stroke: var(--tube-stroke);
  fill: var(--tube-fill);
}
.iwroot a:hover :is(.buoy) {
  stroke-width: 3;
}
.iwroot :is(.arrow, .innertube-text) {
  fill: var(--tube-stroke);
}
`
export const InnertubeWidget = () => {

  return <svg xmlns='http://www.w3.org/2000/svg' className='iwroot'
              width='200px' height='75px' viewBox='0 0 200 75'>
    <style>
      {widgetStyle}
    </style>
    <defs>
      <rect id='full' x='0' y='0' width='100%' height='100%' />
      <mask id='shadowmask'>
        <use href='#full' fill='white' />
        <path fill='black'
              d='M 97.98,25.59 C 95.02,26.14 92.80,26.93 90.50,28.97 81.59,36.84 85.36,51.58 97.12,53.97 98.70,54.30 100.42,54.39 102.02,54.14 104.25,53.79 106.18,53.13 108.06,51.86 109.63,50.80 110.94,49.50 111.99,47.93 118.98,37.56 110.34,24.01 97.98,25.59 Z' />
      </mask>
      <mask id='tubemask'>
        <use href='#full' fill='white' />
        <path fill='black'
              d='M 97.98,23.25 C 95.02,23.79 92.80,24.59 90.50,26.63 81.59,34.49 85.36,49.23 97.12,51.63 98.70,51.95 100.42,52.04 102.02,51.79 104.25,51.44 106.18,50.78 108.06,49.51 109.63,48.46 110.94,47.15 111.99,45.58 118.98,35.21 110.34,21.66 97.98,23.25 Z' />
      </mask>
      <mask id="tubemask-inverted">
        <rect x='90' y='30' width='22' height='15' fill='white' />
      </mask>
    </defs>

    <rect x='0' y='0' width='100%' height='100%' fill='var(--bg-fill)' />
    <path id='next-buoy-shadow' className='shadow'
          d='M 145.76,24.55 C 139.51,27.03 140.76,32.37 140.76,37.98 140.76,43.35 139.11,53.24 145.14,55.59 146.78,56.23 149.01,56.15 150.76,56.15 150.76,56.15 183.89,56.15 183.89,56.15 186.48,56.14 189.16,56.31 191.31,54.58 193.70,52.65 193.85,50.20 193.89,47.38 193.89,47.38 193.89,32.96 193.89,32.96 193.80,25.99 191.14,24.22 184.51,24.19 184.51,24.19 160.14,24.19 160.14,24.19 156.25,24.19 149.29,23.91 145.76,24.55 145.76,24.55 145.76,24.55 145.76,24.55 Z' />
    <a href='https://innertu.be/next?from=https://coglib.sosk.watch'>
      <path id='next-buoy' className='buoy'
            d='M 145.76,22.04 C 139.51,24.53 140.76,29.86 140.76,35.47 140.76,40.85 139.11,50.74 145.14,53.09 146.78,53.72 149.01,53.64 150.76,53.64 150.76,53.64 183.89,53.64 183.89,53.64 186.48,53.64 189.16,53.81 191.31,52.07 193.70,50.14 193.85,47.70 193.89,44.87 193.89,44.87 193.89,30.46 193.89,30.46 193.80,23.49 191.14,21.71 184.51,21.68 184.51,21.68 160.14,21.68 160.14,21.68 156.25,21.68 149.29,21.40 145.76,22.04 145.76,22.04 145.76,22.04 145.76,22.04 Z' />
      <path id='next-arrow' className='arrow'
            d='M 149.51,31.08 C 145.76,31.08 145.76,31.08 145.76,34.16 145.76,34.16 145.76,40.65 145.76,40.65 145.76,43.62 145.76,43.62 149.63,43.62 149.63,43.62 176.39,43.62 176.39,43.62 176.39,43.62 176.39,50.11 176.39,50.11 176.39,50.11 190.14,37.35 190.14,37.35 190.14,37.35 176.39,24.93 176.39,24.93 176.39,24.93 176.39,31.08 176.39,31.08 176.39,31.08 149.51,31.08 149.51,31.08 Z' />
    </a>

    <path id='prev-buoy-shadow' className='shadow'
          d='M 51.82,24.46 C 58.08,26.94 56.82,32.28 56.82,37.88 56.82,43.26 58.48,53.15 52.44,55.50 50.80,56.14 48.57,56.06 46.82,56.06 46.82,56.06 13.69,56.06 13.69,56.06 11.11,56.05 8.43,56.22 6.28,54.49 3.89,52.56 3.73,50.11 3.69,47.28 3.69,47.28 3.69,32.87 3.69,32.87 3.78,25.90 6.44,24.13 13.07,24.10 13.07,24.10 37.44,24.10 37.44,24.10 41.34,24.10 48.29,23.82 51.82,24.46 51.82,24.46 51.82,24.46 51.82,24.46 Z' />
    <a href='https://innertu.be/prev?from=https://coglib.sosk.watch'>
      <path id='prev-buoy' className='buoy'
            d='M 51.82,21.95 C 58.08,24.44 56.82,29.77 56.82,35.38 56.82,40.75 58.48,50.64 52.44,52.99 50.80,53.63 48.57,53.55 46.82,53.55 46.82,53.55 13.69,53.55 13.69,53.55 11.11,53.55 8.43,53.71 6.28,51.98 3.89,50.05 3.73,47.60 3.69,44.78 3.69,44.78 3.69,30.36 3.69,30.36 3.78,23.40 6.44,21.62 13.07,21.59 13.07,21.59 37.44,21.59 37.44,21.59 41.34,21.59 48.29,21.31 51.82,21.95 51.82,21.95 51.82,21.95 51.82,21.95 Z' />
      <path id='prev-arrow' className='arrow'
            d='M 48.07,30.99 C 51.82,30.99 51.82,30.99 51.82,34.07 51.82,34.07 51.82,40.56 51.82,40.56 51.82,43.52 51.82,43.52 47.96,43.52 47.96,43.52 21.19,43.52 21.19,43.52 21.19,43.52 21.19,50.02 21.19,50.02 21.19,50.02 7.44,37.26 7.44,37.26 7.44,37.26 21.19,24.84 21.19,24.84 21.19,24.84 21.19,30.99 21.19,30.99 21.19,30.99 48.07,30.99 48.07,30.99 Z' />
    </a>

    <path id='shadow' mask='url(#shadowmask)'
          d='M 97.98,25.59
           C 95.02,26.14 92.80,26.93 90.50,28.97
             81.59,36.84 85.36,51.58 97.12,53.97
             98.70,54.30 100.42,54.39 102.02,54.14
             104.25,53.79 106.18,53.13 108.06,51.86
             109.63,50.80 110.94,49.50 111.99,47.93
             118.98,37.56 110.34,24.01 97.98,25.59 Z
           M 67.46,39.86
           C 62.13,47.35 67.46,62.62 76.67,62.62
             76.67,72.41 93.09,77.88 100.00,72.41
             107.20,78.02 123.04,72.41 123.04,62.62
             132.54,62.62 138.02,47.35 132.54,39.86
             138.02,32.66 132.54,17.11 123.04,17.11
             123.04,7.61 107.20,0.98 100.00,7.61
             93.09,0.98 76.67,7.61 76.67,17.11
             67.46,17.11 62.13,32.66 67.46,39.86 Z' />
    <path id='outer rim'
          className='tube' mask='url(#tubemask)'
          fill='none' stroke='black' strokeWidth='1'
          d='M 97.98,23.25 C 95.02,23.79 92.80,24.59 90.50,26.63 81.59,34.49 85.36,49.23 97.12,51.63 98.70,51.95 100.42,52.04 102.02,51.79 104.25,51.44 106.18,50.78 108.06,49.51 109.63,48.46 110.94,47.15 111.99,45.58 118.98,35.21 110.34,21.66 97.98,23.25 Z
           M 67.46,37.52 C 62.13,45.01 67.46,60.27 76.67,60.27 76.67,70.06 93.09,75.54 100.00,70.06 107.20,75.68 123.04,70.06 123.04,60.27 132.54,60.27 138.02,45.01 132.54,37.52 138.02,30.32 132.54,14.77 123.04,14.77 123.04,5.26 107.20,-1.36 100.00,5.26 93.09,-1.36 76.67,5.26 76.67,14.77 67.46,14.77 62.13,30.32 67.46,37.52 Z' />
    <path id='text-baseline' fill='none' stroke='none'
          d='M 102.30,19.44 C 106.45,20.18 110.24,21.74 113.17,24.87 121.98,34.30 118.77,49.68 106.62,54.45 104.75,55.19 102.59,55.64 100.58,55.66 97.53,55.70 95.33,55.31 92.51,54.10 90.35,53.17 87.87,51.41 86.35,49.61 78.22,39.94 81.39,25.30 93.38,20.59 95.25,19.85 97.41,19.40 99.42,19.44 99.42,19.44 102.30,19.44 102.30,19.44 Z' />
    <path id='inner tube' mask='url(#tubemask)' className='tube' strokeWidth='1.5'
          d='M 97.98,23.25 C 95.02,23.79 92.80,24.59 90.50,26.63 81.59,34.49 85.36,49.23 97.12,51.63 98.70,51.95 100.42,52.04 102.02,51.79 104.25,51.44 106.18,50.78 108.06,49.51 109.63,48.46 110.94,47.15 111.99,45.58 118.98,35.21 110.34,21.66 97.98,23.25 Z
           M 97.12,4.33 C 94.77,4.73 93.42,4.87 91.07,5.54 82.05,8.11 74.63,14.45 70.71,22.98 62.66,40.55 71.41,61.34 89.92,67.43 92.49,68.28 96.15,69.03 98.85,69.06 104.38,69.13 109.38,68.27 114.40,65.82 131.40,57.54 137.69,36.30 128.05,20.10 126.74,17.90 124.85,15.31 123.01,13.53 119.95,10.55 116.08,8.06 112.10,6.51 108.67,5.19 104.54,4.27 100.86,4.33 100.86,4.33 97.12,4.33 97.12,4.33 Z' />
    <a href='https://innertu.be'>
      <text className='innertube-text' transform='rotate(212, 100, 37.5)' lengthAdjust='spacing'>
        <textPath method='stretch' spacing='auto' lengthAdjust='spacing' href='#text-baseline'>
          INNERTU.BE
        </textPath>
      </text>
    </a>

    <a href='https://innertu.be/random'>
      <rect id='click-target' x='90' y='30' fill='var(--bg-fill)' width='22' height='15' />
      <path className='rand-low' fill='none' stroke='var(--random-stroke)' strokeWidth='2'
            d='M 91.00,43.97
           C 91.00,43.97 100.00,44.00 100.04,39.27
             100.00,31.00 109.00,32.00 109.00,32.00
             109.00,32.00 107.00,33.00 107.00,33.00M 109.00,32.00
           C 109.00,32.00 107.00,31.00 107.00,31.00' />
      <path className='rand-high-outer' stroke='var(--bg-fill)' strokeWidth='3' mask='url(#tubemask-inverted)'
            d='M 91.00,31.03
           C 91.00,31.03 100.00,31.00 100.04,35.73
             100.00,44.00 109.00,43.00 109.00,43.00
             109.00,43.00 107.00,42.00 107.00,42.00M 109.00,43.00
           C 109.00,43.00 107.00,44.00 107.00,44.00' />
      <path className='rand-high-inner' fill='none' stroke='var(--random-stroke)' strokeWidth='2'
            d='M 91.00,31.03
           C 91.00,31.03 100.00,31.00 100.04,35.73
             100.00,44.00 109.00,43.00 109.00,43.00
             109.00,43.00 107.00,42.00 107.00,42.00M 109.00,43.00
           C 109.00,43.00 107.00,44.00 107.00,44.00' />
    </a>
  </svg>
}