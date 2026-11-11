# Innowave OHIF viewer (based on OHIF 3.14.0-beta.72)

All options go in `platform/app/public/config/default.js` (or your deployed `app-config.js`).

| Option | Default | Purpose |
|---|---|---|
| `loadPriorStudies` | `true` | `false` = only the opened study is listed; prior studies of the same patient are not queried. |
| `autoPetCtFusion` | `true` | Studies with both PT and CT opened at `/viewer` switch to the PET/CT fusion (TMTV) mode. Use `&fusion=off` in a URL to skip. |
| `patientOverlay` | enabled, top-left | Patient text on the image. `items` = `{label, tag}` or `{label, template}` (e.g. `'{PatientName} {PatientAge}/{PatientSex}'`). `format: 'name'` / `'date'` optional. Add any DICOM keyword you want. |
| `webglRecovery` | `'reload'` | Reloads once (max 2 per 30 s) after a WebGL context loss; `'off'` disables. |
| `preferSizeOverAccuracy` | auto on iPhone/iPad | Half-float textures: fixes black MPR on iOS and halves GPU memory. Set `true` to force it on every device (faster MPR on weak GPUs). |
| `maxNumberOfWebWorkers` | `8` | More decode threads (capped by CPU cores). |
| `maxNumRequests.prefetch` | `50` | More parallel requests when volumes (MPR/3D) load. |
| `requestTransferSyntaxUID` (in data source) | off | e.g. `'1.2.840.10008.1.2.1'` makes dcm4chee send uncompressed pixels: no JS decoding, but more server CPU/bandwidth. Try it for LAN use. |

## MPR / 3D slowness: server side
- Serve dcm4chee behind a reverse proxy with **HTTP/2** (HTTP/1.1 caps ~6 parallel requests per host).
- Compressed JPEG2000/JPEG-LS decode in JS is the usual bottleneck; test `requestTransferSyntaxUID` or store studies uncompressed/lossless-JPEG.
- Ensure gzip is off for pixel data (already compressed) and the proxy does not buffer responses.
