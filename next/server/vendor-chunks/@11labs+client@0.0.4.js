"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@11labs+client@0.0.4";
exports.ids = ["vendor-chunks/@11labs+client@0.0.4"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@11labs+client@0.0.4/node_modules/@11labs/client/dist/lib.modern.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@11labs+client@0.0.4/node_modules/@11labs/client/dist/lib.modern.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Conversation: () => (/* binding */ p)\n/* harmony export */ });\nfunction t(){return t=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var s in n)({}).hasOwnProperty.call(n,s)&&(t[s]=n[s])}return t},t.apply(null,arguments)}function e(t){const e=new Uint8Array(t);return window.btoa(String.fromCharCode(...e))}function n(t){const e=window.atob(t),n=e.length,s=new Uint8Array(n);for(let t=0;t<n;t++)s[t]=e.charCodeAt(t);return s.buffer}const s=new Blob(['\\n      const TARGET_SAMPLE_RATE = 16000;\\n      class RawAudioProcessor extends AudioWorkletProcessor {\\n        constructor() {\\n          super();\\n          this.buffer = []; // Initialize an empty buffer\\n          this.bufferSize = TARGET_SAMPLE_RATE / 4; // Define the threshold for buffer size to be ~0.25s\\n\\n          if (globalThis.LibSampleRate && sampleRate !== TARGET_SAMPLE_RATE) {\\n            globalThis.LibSampleRate.create(1, sampleRate, TARGET_SAMPLE_RATE).then(resampler => {\\n              this.resampler = resampler;\\n            });\\n          }\\n        }\\n        process(inputs, outputs) {\\n          const input = inputs[0]; // Get the first input node\\n          if (input.length > 0) {\\n            let channelData = input[0]; // Get the first channel\\'s data\\n\\n            // Resample the audio if necessary\\n            if (this.resampler) {\\n              channelData = this.resampler.full(channelData);\\n            }\\n\\n            // Add channel data to the buffer\\n            this.buffer.push(...channelData);\\n            // Get max volume \\n            let sum = 0.0;\\n            for (let i = 0; i < channelData.length; i++) {\\n              sum += channelData[i] * channelData[i];\\n            }\\n            const maxVolume = Math.sqrt(sum / channelData.length);\\n            // Check if buffer size has reached or exceeded the threshold\\n            if (this.buffer.length >= this.bufferSize) {\\n              const float32Array = new Float32Array(this.buffer)\\n              let pcm16Array = new Int16Array(float32Array.length);\\n\\n              // Iterate through the Float32Array and convert each sample to PCM16\\n              for (let i = 0; i < float32Array.length; i++) {\\n                // Clamp the value to the range [-1, 1]\\n                let sample = Math.max(-1, Math.min(1, float32Array[i]));\\n            \\n                // Scale the sample to the range [-32768, 32767] and store it in the Int16Array\\n                pcm16Array[i] = sample < 0 ? sample * 32768 : sample * 32767;\\n              }\\n            \\n              // Send the buffered data to the main script\\n              this.port.postMessage([pcm16Array, maxVolume]);\\n            \\n              // Clear the buffer after sending\\n              this.buffer = [];\\n            }\\n          }\\n          return true; // Continue processing\\n        }\\n      }\\n      registerProcessor(\"raw-audio-processor\", RawAudioProcessor);\\n  '],{type:\"application/javascript\"}),o=URL.createObjectURL(s);class a{static async create(t){let e=null,n=null;try{const s=navigator.mediaDevices.getSupportedConstraints().sampleRate;e=new window.AudioContext(s?{sampleRate:t}:{});const i=e.createAnalyser();s||await e.audioWorklet.addModule(\"https://cdn.jsdelivr.net/npm/@alexanderolsen/libsamplerate-js@2.1.2/dist/libsamplerate.worklet.js\"),await e.audioWorklet.addModule(o),n=await navigator.mediaDevices.getUserMedia({audio:{sampleRate:{ideal:t},echoCancellation:{ideal:!0},noiseSuppression:{ideal:!0}}});const r=e.createMediaStreamSource(n),l=new AudioWorkletNode(e,\"raw-audio-processor\");return r.connect(i),i.connect(l),new a(e,i,l,n)}catch(t){var s,i;throw null==(s=n)||s.getTracks().forEach(t=>t.stop()),null==(i=e)||i.close(),t}}constructor(t,e,n,s){this.context=void 0,this.analyser=void 0,this.worklet=void 0,this.inputStream=void 0,this.context=t,this.analyser=e,this.worklet=n,this.inputStream=s}async close(){this.inputStream.getTracks().forEach(t=>t.stop()),await this.context.close()}}const i=new Blob(['\\n      class AudioConcatProcessor extends AudioWorkletProcessor {\\n        constructor() {\\n          super();\\n          this.buffers = []; // Initialize an empty buffer\\n          this.cursor = 0;\\n          this.currentBuffer = null;\\n          this.wasInterrupted = false;\\n          this.finished = false;\\n\\n          this.port.onmessage = ({ data }) => {\\n            switch (data.type) {\\n              case \"buffer\":\\n                this.wasInterrupted = false;\\n                this.buffers.push(new Int16Array(data.buffer));\\n                break;\\n              case \"interrupt\":\\n                this.wasInterrupted = true;\\n                break;\\n              case \"clearInterrupted\":\\n                if (this.wasInterrupted) {\\n                  this.wasInterrupted = false;\\n                  this.buffers = [];\\n                  this.currentBuffer = null;\\n                }\\n            }\\n          };\\n        }\\n        process(_, outputs) {\\n          let finished = false;\\n          const output = outputs[0][0];\\n          for (let i = 0; i < output.length; i++) {\\n            if (!this.currentBuffer) {\\n              if (this.buffers.length === 0) {\\n                finished = true;\\n                break;\\n              }\\n              this.currentBuffer = this.buffers.shift();\\n              this.cursor = 0;\\n            }\\n\\n            output[i] = this.currentBuffer[this.cursor] / 32768;\\n            this.cursor++;\\n\\n            if (this.cursor >= this.currentBuffer.length) {\\n              this.currentBuffer = null;\\n            }\\n          }\\n\\n          if (this.finished !== finished) {\\n            this.finished = finished;\\n            this.port.postMessage({ type: \"process\", finished });\\n          }\\n\\n          return true; // Continue processing\\n        }\\n      }\\n\\n      registerProcessor(\"audio-concat-processor\", AudioConcatProcessor);\\n    '],{type:\"application/javascript\"}),r=URL.createObjectURL(i);class l{static async create(t){let e=null;try{e=new AudioContext({sampleRate:t});const n=e.createAnalyser(),s=e.createGain();s.connect(n),n.connect(e.destination),await e.audioWorklet.addModule(r);const o=new AudioWorkletNode(e,\"audio-concat-processor\");return o.connect(s),new l(e,n,s,o)}catch(t){var n;throw null==(n=e)||n.close(),t}}constructor(t,e,n,s){this.context=void 0,this.analyser=void 0,this.gain=void 0,this.worklet=void 0,this.context=t,this.analyser=e,this.gain=n,this.worklet=s}async close(){await this.context.close()}}function c(t){return!!t.type}class u{static async create(t){let e=null;try{var n;const s=null!=(n=t.origin)?n:\"wss://api.elevenlabs.io\",o=t.signedUrl?t.signedUrl:s+\"/v1/convai/conversation?agent_id=\"+t.agentId,a=[\"convai\"];t.authorization&&a.push(`bearer.${t.authorization}`),e=new WebSocket(o,a);const i=await new Promise((n,s)=>{e.addEventListener(\"open\",()=>{var n;const s={type:\"conversation_initiation_client_data\"};var o,a,i,r;t.overrides&&(s.conversation_config_override={agent:{prompt:null==(o=t.overrides.agent)?void 0:o.prompt,first_message:null==(a=t.overrides.agent)?void 0:a.firstMessage,language:null==(i=t.overrides.agent)?void 0:i.language},tts:{voice_id:null==(r=t.overrides.tts)?void 0:r.voiceId}}),t.customLlmExtraBody&&(s.custom_llm_extra_body=t.customLlmExtraBody),null==(n=e)||n.send(JSON.stringify(s))},{once:!0}),e.addEventListener(\"error\",s),e.addEventListener(\"close\",s),e.addEventListener(\"message\",t=>{const e=JSON.parse(t.data);c(e)&&(\"conversation_initiation_metadata\"===e.type?n(e.conversation_initiation_metadata_event):console.warn(\"First received message is not conversation metadata.\"))},{once:!0})}),r=i.conversation_id,l=parseInt(i.agent_output_audio_format.replace(\"pcm_\",\"\"));return new u(e,r,l)}catch(t){var s;throw null==(s=e)||s.close(),t}}constructor(t,e,n){this.socket=void 0,this.conversationId=void 0,this.sampleRate=void 0,this.socket=t,this.conversationId=e,this.sampleRate=n}close(){this.socket.close()}sendMessage(t){this.socket.send(JSON.stringify(t))}}const h={clientTools:{}},d={onConnect:()=>{},onDebug:()=>{},onDisconnect:()=>{},onError:()=>{},onMessage:()=>{},onModeChange:()=>{},onStatusChange:()=>{}};class p{static async startSession(e){const n=t({},h,d,e);n.onStatusChange({status:\"connecting\"});let s=null,o=null,i=null;try{return s=await a.create(16e3),o=await u.create(e),i=await l.create(o.sampleRate),new p(n,o,s,i)}catch(t){var r,c,f;throw n.onStatusChange({status:\"disconnected\"}),null==(r=o)||r.close(),await(null==(c=s)?void 0:c.close()),await(null==(f=i)?void 0:f.close()),t}}constructor(t,s,o,a){var i=this;this.options=void 0,this.connection=void 0,this.input=void 0,this.output=void 0,this.lastInterruptTimestamp=0,this.mode=\"listening\",this.status=\"connecting\",this.inputFrequencyData=void 0,this.outputFrequencyData=void 0,this.volume=1,this.endSession=async function(){\"connected\"===i.status&&(i.updateStatus(\"disconnecting\"),i.connection.close(),await i.input.close(),await i.output.close(),i.updateStatus(\"disconnected\"))},this.updateMode=t=>{t!==this.mode&&(this.mode=t,this.options.onModeChange({mode:t}))},this.updateStatus=t=>{t!==this.status&&(this.status=t,this.options.onStatusChange({status:t}))},this.onEvent=async function(t){try{const n=JSON.parse(t.data);if(!c(n))return;switch(n.type){case\"interruption\":n.interruption_event&&(i.lastInterruptTimestamp=n.interruption_event.event_id),i.fadeOutAudio();break;case\"agent_response\":i.options.onMessage({source:\"ai\",message:n.agent_response_event.agent_response});break;case\"user_transcript\":i.options.onMessage({source:\"user\",message:n.user_transcription_event.user_transcript});break;case\"internal_tentative_agent_response\":i.options.onDebug({type:\"tentative_agent_response\",response:n.tentative_agent_response_internal_event.tentative_agent_response});break;case\"client_tool_call\":if(i.options.clientTools.hasOwnProperty(n.client_tool_call.tool_name)){try{var e;const t=null!=(e=await i.options.clientTools[n.client_tool_call.tool_name](n.client_tool_call.parameters))?e:\"Client tool execution successful.\";i.connection.sendMessage({type:\"client_tool_result\",tool_call_id:n.client_tool_call.tool_call_id,result:t,is_error:!1})}catch(t){i.onError(\"Client tool execution failed with following error: \"+(null==t?void 0:t.message),{clientToolName:n.client_tool_call.tool_name}),i.connection.sendMessage({type:\"client_tool_result\",tool_call_id:n.client_tool_call.tool_call_id,result:\"Client tool execution failed: \"+(null==t?void 0:t.message),is_error:!0})}break}if(i.options.onUnhandledClientToolCall){i.options.onUnhandledClientToolCall(n.client_tool_call);break}i.onError(`Client tool with name ${n.client_tool_call.tool_name} is not defined on client`,{clientToolName:n.client_tool_call.tool_name}),i.connection.sendMessage({type:\"client_tool_result\",tool_call_id:n.client_tool_call.tool_call_id,result:`Client tool with name ${n.client_tool_call.tool_name} is not defined on client`,is_error:!0});break;case\"audio\":i.lastInterruptTimestamp<=n.audio_event.event_id&&(i.addAudioBase64Chunk(n.audio_event.audio_base_64),i.updateMode(\"speaking\"));break;case\"ping\":i.connection.sendMessage({type:\"pong\",event_id:n.ping_event.event_id});break;default:i.options.onDebug(n)}}catch(e){return void i.onError(\"Failed to parse event data\",{event:t})}},this.onInputWorkletMessage=t=>{\"connected\"===this.status&&this.connection.sendMessage({user_audio_chunk:e(t.data[0].buffer)})},this.onOutputWorkletMessage=({data:t})=>{\"process\"===t.type&&this.updateMode(t.finished?\"listening\":\"speaking\")},this.addAudioBase64Chunk=async function(t){i.output.gain.gain.value=i.volume,i.output.worklet.port.postMessage({type:\"clearInterrupted\"}),i.output.worklet.port.postMessage({type:\"buffer\",buffer:n(t)})},this.fadeOutAudio=async function(){i.updateMode(\"listening\"),i.output.worklet.port.postMessage({type:\"interrupt\"}),i.output.gain.gain.exponentialRampToValueAtTime(1e-4,i.output.context.currentTime+2),setTimeout(()=>{i.output.gain.gain.value=i.volume,i.output.worklet.port.postMessage({type:\"clearInterrupted\"})},2e3)},this.onError=(t,e)=>{console.error(t,e),this.options.onError(t,e)},this.calculateVolume=t=>{if(0===t.length)return 0;let e=0;for(let n=0;n<t.length;n++)e+=t[n]/255;return e/=t.length,e<0?0:e>1?1:e},this.getId=()=>this.connection.conversationId,this.setVolume=({volume:t})=>{this.volume=t},this.getInputByteFrequencyData=()=>(null!=this.inputFrequencyData||(this.inputFrequencyData=new Uint8Array(this.input.analyser.frequencyBinCount)),this.input.analyser.getByteFrequencyData(this.inputFrequencyData),this.inputFrequencyData),this.getOutputByteFrequencyData=()=>(null!=this.outputFrequencyData||(this.outputFrequencyData=new Uint8Array(this.output.analyser.frequencyBinCount)),this.output.analyser.getByteFrequencyData(this.outputFrequencyData),this.outputFrequencyData),this.getInputVolume=()=>this.calculateVolume(this.getInputByteFrequencyData()),this.getOutputVolume=()=>this.calculateVolume(this.getOutputByteFrequencyData()),this.options=t,this.connection=s,this.input=o,this.output=a,this.options.onConnect({conversationId:s.conversationId}),this.connection.socket.addEventListener(\"message\",t=>{this.onEvent(t)}),this.connection.socket.addEventListener(\"error\",t=>{this.updateStatus(\"disconnected\"),this.onError(\"Socket error\",t)}),this.connection.socket.addEventListener(\"close\",()=>{this.updateStatus(\"disconnected\"),this.options.onDisconnect()}),this.input.worklet.port.onmessage=this.onInputWorkletMessage,this.output.worklet.port.onmessage=this.onOutputWorkletMessage,this.updateStatus(\"connected\")}}\n//# sourceMappingURL=lib.modern.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQDExbGFicytjbGllbnRAMC4wLjQvbm9kZV9tb2R1bGVzL0AxMWxhYnMvY2xpZW50L2Rpc3QvbGliLm1vZGVybi5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUEsYUFBYSx3REFBd0QsWUFBWSxtQkFBbUIsS0FBSyxtQkFBbUIsa0JBQWtCLHdDQUF3QyxTQUFTLHlCQUF5QixjQUFjLDBCQUEwQiw4Q0FBOEMsY0FBYyxzREFBc0QsWUFBWSxJQUFJLHlCQUF5QixnQkFBZ0IsNERBQTRELCtEQUErRCx5QkFBeUIsb0JBQW9CLDhCQUE4QixtRkFBbUYsc0lBQXNJLG9HQUFvRywyQ0FBMkMsZUFBZSxFQUFFLGFBQWEsV0FBVyxvQ0FBb0MscUNBQXFDLDhEQUE4RCwwQ0FBMEMscUhBQXFILCtEQUErRCxlQUFlLGdHQUFnRyw0REFBNEQsOEJBQThCLHdCQUF3QixNQUFNLHVEQUF1RCxlQUFlLG9FQUFvRSxxSUFBcUksdUlBQXVJLHNIQUFzSCx5QkFBeUIsTUFBTSxtSUFBbUksOExBQThMLGlCQUFpQix5SUFBeUksZ0dBQWdHLGVBQWUsYUFBYSx5QkFBeUIsaUNBQWlDLFNBQVMsb0VBQW9FLFFBQVEsOEJBQThCLDJCQUEyQixRQUFRLHVCQUF1QixrQkFBa0IsSUFBSSxvRUFBb0UsNkJBQTZCLGFBQWEsR0FBRyxFQUFFLDJCQUEyQixzTkFBc04sT0FBTyxZQUFZLFFBQVEsbUJBQW1CLFNBQVMsbUJBQW1CLFdBQVcsRUFBRSxxRkFBcUYsZ0RBQWdELFNBQVMsUUFBUSxnRkFBZ0YscUJBQXFCLHNKQUFzSixjQUFjLDhFQUE4RSxxRkFBcUYseUJBQXlCLG9CQUFvQiwrQkFBK0IseURBQXlELHNDQUFzQyx3Q0FBd0Msa0NBQWtDLHVDQUF1QyxNQUFNLE1BQU0sa0NBQWtDLDRFQUE0RSxpRUFBaUUsd0JBQXdCLDhFQUE4RSx3QkFBd0Isb0ZBQW9GLGdEQUFnRCxzQ0FBc0MsOENBQThDLG1CQUFtQixlQUFlLGNBQWMsV0FBVywrQkFBK0IsaUNBQWlDLHlDQUF5Qyw0QkFBNEIsbUJBQW1CLE1BQU0sd0NBQXdDLGdEQUFnRCxrQ0FBa0Msd0JBQXdCLGlCQUFpQiwwREFBMEQsZ0NBQWdDLGVBQWUsb0VBQW9FLDRCQUE0QiwrREFBK0QsMENBQTBDLGVBQWUsYUFBYSwrQ0FBK0MsdUNBQXVDLHNDQUFzQywyQkFBMkIsRUFBRSxhQUFhLDJCQUEyQixpQ0FBaUMsU0FBUyw0RUFBNEUsVUFBVSw4QkFBOEIsMkJBQTJCLFFBQVEsdUJBQXVCLFdBQVcsSUFBSSxvQkFBb0IsYUFBYSxFQUFFLDRDQUE0Qyx3RUFBd0UseURBQXlELG1DQUFtQyxTQUFTLE1BQU0sZ0NBQWdDLHFCQUFxQix3SUFBd0ksY0FBYyw0QkFBNEIsY0FBYyxlQUFlLFFBQVEsdUJBQXVCLFdBQVcsSUFBSSxNQUFNLDhJQUE4SSxrQ0FBa0MsZ0JBQWdCLHdCQUF3QixrQ0FBa0MsK0JBQStCLE1BQU0sU0FBUyw0Q0FBNEMsWUFBWSw4Q0FBOEMsT0FBTywwS0FBMEssTUFBTSxxREFBcUQsOEdBQThHLEVBQUUsUUFBUSwrRkFBK0YsMkJBQTJCLHFLQUFxSyxFQUFFLFFBQVEsRUFBRSxpRkFBaUYsb0JBQW9CLFNBQVMsTUFBTSxnQ0FBZ0MsbUJBQW1CLDJIQUEySCxRQUFRLG9CQUFvQixlQUFlLHFDQUFxQyxTQUFTLGVBQWUsSUFBSSxnQkFBZ0IsZUFBZSxvQkFBb0IsZUFBZSxpQkFBaUIsb0JBQW9CLHdCQUF3QixRQUFRLDZCQUE2QixZQUFZLFFBQVEsa0JBQWtCLG9CQUFvQixFQUFFLHlCQUF5QixJQUFJLGdHQUFnRyxTQUFTLFVBQVUsd0JBQXdCLHNCQUFzQixvR0FBb0cscUJBQXFCLFdBQVcsMlFBQTJRLDJKQUEySixxQkFBcUIsdURBQXVELE9BQU8sR0FBRyx1QkFBdUIsNkRBQTZELFNBQVMsR0FBRyxnQ0FBZ0MsSUFBSSwyQkFBMkIsZ0JBQWdCLGVBQWUsbUhBQW1ILE1BQU0sMENBQTBDLDBEQUEwRCxFQUFFLE1BQU0sMkNBQTJDLGlFQUFpRSxFQUFFLE1BQU0sMkRBQTJELDRHQUE0RyxFQUFFLE1BQU0sOEZBQThGLElBQUksTUFBTSxpSkFBaUosMEJBQTBCLDRGQUE0RixFQUFFLFNBQVMsNEZBQTRGLDRDQUE0Qyw0QkFBNEIsc0pBQXNKLEVBQUUsTUFBTSx3Q0FBd0Msd0RBQXdELE1BQU0sbUNBQW1DLDhCQUE4QiwyQkFBMkIsNENBQTRDLDRCQUE0Qix1R0FBdUcsOEJBQThCLHNDQUFzQyxFQUFFLE1BQU0sNElBQTRJLE1BQU0scUNBQXFDLDJDQUEyQyxFQUFFLE1BQU0sOEJBQThCLFNBQVMsb0RBQW9ELFFBQVEsR0FBRyxnQ0FBZ0Msd0RBQXdELHFDQUFxQyxFQUFFLCtCQUErQixPQUFPLElBQUksdUVBQXVFLDRDQUE0QyxxRUFBcUUsd0JBQXdCLHFDQUFxQywwQkFBMEIsRUFBRSxvQ0FBb0MsNkRBQTZELGlCQUFpQix1R0FBdUcscUVBQXFFLHdCQUF3QixFQUFFLE1BQU0sc0JBQXNCLDZDQUE2QywwQkFBMEIseUJBQXlCLFFBQVEsWUFBWSxXQUFXLGdCQUFnQixpQ0FBaUMsZ0VBQWdFLFNBQVMsSUFBSSxjQUFjLHd0QkFBd3RCLGdDQUFnQyx3REFBd0QsZ0JBQWdCLHNEQUFzRCxpRUFBaUUsdURBQXVELDhEQUE4RCw4SkFBd0w7QUFDeHZhIiwic291cmNlcyI6WyIvaG9tZS9rbGFyYWs3NzcvZWxldmVubGFicy1uZXh0anMtY29udmVyc2F0aW9uYWwtYWkvbm9kZV9tb2R1bGVzLy5wbnBtL0AxMWxhYnMrY2xpZW50QDAuMC40L25vZGVfbW9kdWxlcy9AMTFsYWJzL2NsaWVudC9kaXN0L2xpYi5tb2Rlcm4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gdCgpe3JldHVybiB0PU9iamVjdC5hc3NpZ24/T2JqZWN0LmFzc2lnbi5iaW5kKCk6ZnVuY3Rpb24odCl7Zm9yKHZhciBlPTE7ZTxhcmd1bWVudHMubGVuZ3RoO2UrKyl7dmFyIG49YXJndW1lbnRzW2VdO2Zvcih2YXIgcyBpbiBuKSh7fSkuaGFzT3duUHJvcGVydHkuY2FsbChuLHMpJiYodFtzXT1uW3NdKX1yZXR1cm4gdH0sdC5hcHBseShudWxsLGFyZ3VtZW50cyl9ZnVuY3Rpb24gZSh0KXtjb25zdCBlPW5ldyBVaW50OEFycmF5KHQpO3JldHVybiB3aW5kb3cuYnRvYShTdHJpbmcuZnJvbUNoYXJDb2RlKC4uLmUpKX1mdW5jdGlvbiBuKHQpe2NvbnN0IGU9d2luZG93LmF0b2IodCksbj1lLmxlbmd0aCxzPW5ldyBVaW50OEFycmF5KG4pO2ZvcihsZXQgdD0wO3Q8bjt0Kyspc1t0XT1lLmNoYXJDb2RlQXQodCk7cmV0dXJuIHMuYnVmZmVyfWNvbnN0IHM9bmV3IEJsb2IoWydcXG4gICAgICBjb25zdCBUQVJHRVRfU0FNUExFX1JBVEUgPSAxNjAwMDtcXG4gICAgICBjbGFzcyBSYXdBdWRpb1Byb2Nlc3NvciBleHRlbmRzIEF1ZGlvV29ya2xldFByb2Nlc3NvciB7XFxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcXG4gICAgICAgICAgc3VwZXIoKTtcXG4gICAgICAgICAgdGhpcy5idWZmZXIgPSBbXTsgLy8gSW5pdGlhbGl6ZSBhbiBlbXB0eSBidWZmZXJcXG4gICAgICAgICAgdGhpcy5idWZmZXJTaXplID0gVEFSR0VUX1NBTVBMRV9SQVRFIC8gNDsgLy8gRGVmaW5lIHRoZSB0aHJlc2hvbGQgZm9yIGJ1ZmZlciBzaXplIHRvIGJlIH4wLjI1c1xcblxcbiAgICAgICAgICBpZiAoZ2xvYmFsVGhpcy5MaWJTYW1wbGVSYXRlICYmIHNhbXBsZVJhdGUgIT09IFRBUkdFVF9TQU1QTEVfUkFURSkge1xcbiAgICAgICAgICAgIGdsb2JhbFRoaXMuTGliU2FtcGxlUmF0ZS5jcmVhdGUoMSwgc2FtcGxlUmF0ZSwgVEFSR0VUX1NBTVBMRV9SQVRFKS50aGVuKHJlc2FtcGxlciA9PiB7XFxuICAgICAgICAgICAgICB0aGlzLnJlc2FtcGxlciA9IHJlc2FtcGxlcjtcXG4gICAgICAgICAgICB9KTtcXG4gICAgICAgICAgfVxcbiAgICAgICAgfVxcbiAgICAgICAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMpIHtcXG4gICAgICAgICAgY29uc3QgaW5wdXQgPSBpbnB1dHNbMF07IC8vIEdldCB0aGUgZmlyc3QgaW5wdXQgbm9kZVxcbiAgICAgICAgICBpZiAoaW5wdXQubGVuZ3RoID4gMCkge1xcbiAgICAgICAgICAgIGxldCBjaGFubmVsRGF0YSA9IGlucHV0WzBdOyAvLyBHZXQgdGhlIGZpcnN0IGNoYW5uZWxcXCdzIGRhdGFcXG5cXG4gICAgICAgICAgICAvLyBSZXNhbXBsZSB0aGUgYXVkaW8gaWYgbmVjZXNzYXJ5XFxuICAgICAgICAgICAgaWYgKHRoaXMucmVzYW1wbGVyKSB7XFxuICAgICAgICAgICAgICBjaGFubmVsRGF0YSA9IHRoaXMucmVzYW1wbGVyLmZ1bGwoY2hhbm5lbERhdGEpO1xcbiAgICAgICAgICAgIH1cXG5cXG4gICAgICAgICAgICAvLyBBZGQgY2hhbm5lbCBkYXRhIHRvIHRoZSBidWZmZXJcXG4gICAgICAgICAgICB0aGlzLmJ1ZmZlci5wdXNoKC4uLmNoYW5uZWxEYXRhKTtcXG4gICAgICAgICAgICAvLyBHZXQgbWF4IHZvbHVtZSBcXG4gICAgICAgICAgICBsZXQgc3VtID0gMC4wO1xcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhbm5lbERhdGEubGVuZ3RoOyBpKyspIHtcXG4gICAgICAgICAgICAgIHN1bSArPSBjaGFubmVsRGF0YVtpXSAqIGNoYW5uZWxEYXRhW2ldO1xcbiAgICAgICAgICAgIH1cXG4gICAgICAgICAgICBjb25zdCBtYXhWb2x1bWUgPSBNYXRoLnNxcnQoc3VtIC8gY2hhbm5lbERhdGEubGVuZ3RoKTtcXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBidWZmZXIgc2l6ZSBoYXMgcmVhY2hlZCBvciBleGNlZWRlZCB0aGUgdGhyZXNob2xkXFxuICAgICAgICAgICAgaWYgKHRoaXMuYnVmZmVyLmxlbmd0aCA+PSB0aGlzLmJ1ZmZlclNpemUpIHtcXG4gICAgICAgICAgICAgIGNvbnN0IGZsb2F0MzJBcnJheSA9IG5ldyBGbG9hdDMyQXJyYXkodGhpcy5idWZmZXIpXFxuICAgICAgICAgICAgICBsZXQgcGNtMTZBcnJheSA9IG5ldyBJbnQxNkFycmF5KGZsb2F0MzJBcnJheS5sZW5ndGgpO1xcblxcbiAgICAgICAgICAgICAgLy8gSXRlcmF0ZSB0aHJvdWdoIHRoZSBGbG9hdDMyQXJyYXkgYW5kIGNvbnZlcnQgZWFjaCBzYW1wbGUgdG8gUENNMTZcXG4gICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmxvYXQzMkFycmF5Lmxlbmd0aDsgaSsrKSB7XFxuICAgICAgICAgICAgICAgIC8vIENsYW1wIHRoZSB2YWx1ZSB0byB0aGUgcmFuZ2UgWy0xLCAxXVxcbiAgICAgICAgICAgICAgICBsZXQgc2FtcGxlID0gTWF0aC5tYXgoLTEsIE1hdGgubWluKDEsIGZsb2F0MzJBcnJheVtpXSkpO1xcbiAgICAgICAgICAgIFxcbiAgICAgICAgICAgICAgICAvLyBTY2FsZSB0aGUgc2FtcGxlIHRvIHRoZSByYW5nZSBbLTMyNzY4LCAzMjc2N10gYW5kIHN0b3JlIGl0IGluIHRoZSBJbnQxNkFycmF5XFxuICAgICAgICAgICAgICAgIHBjbTE2QXJyYXlbaV0gPSBzYW1wbGUgPCAwID8gc2FtcGxlICogMzI3NjggOiBzYW1wbGUgKiAzMjc2NztcXG4gICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICBcXG4gICAgICAgICAgICAgIC8vIFNlbmQgdGhlIGJ1ZmZlcmVkIGRhdGEgdG8gdGhlIG1haW4gc2NyaXB0XFxuICAgICAgICAgICAgICB0aGlzLnBvcnQucG9zdE1lc3NhZ2UoW3BjbTE2QXJyYXksIG1heFZvbHVtZV0pO1xcbiAgICAgICAgICAgIFxcbiAgICAgICAgICAgICAgLy8gQ2xlYXIgdGhlIGJ1ZmZlciBhZnRlciBzZW5kaW5nXFxuICAgICAgICAgICAgICB0aGlzLmJ1ZmZlciA9IFtdO1xcbiAgICAgICAgICAgIH1cXG4gICAgICAgICAgfVxcbiAgICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gQ29udGludWUgcHJvY2Vzc2luZ1xcbiAgICAgICAgfVxcbiAgICAgIH1cXG4gICAgICByZWdpc3RlclByb2Nlc3NvcihcInJhdy1hdWRpby1wcm9jZXNzb3JcIiwgUmF3QXVkaW9Qcm9jZXNzb3IpO1xcbiAgJ10se3R5cGU6XCJhcHBsaWNhdGlvbi9qYXZhc2NyaXB0XCJ9KSxvPVVSTC5jcmVhdGVPYmplY3RVUkwocyk7Y2xhc3MgYXtzdGF0aWMgYXN5bmMgY3JlYXRlKHQpe2xldCBlPW51bGwsbj1udWxsO3RyeXtjb25zdCBzPW5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0U3VwcG9ydGVkQ29uc3RyYWludHMoKS5zYW1wbGVSYXRlO2U9bmV3IHdpbmRvdy5BdWRpb0NvbnRleHQocz97c2FtcGxlUmF0ZTp0fTp7fSk7Y29uc3QgaT1lLmNyZWF0ZUFuYWx5c2VyKCk7c3x8YXdhaXQgZS5hdWRpb1dvcmtsZXQuYWRkTW9kdWxlKFwiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9AYWxleGFuZGVyb2xzZW4vbGlic2FtcGxlcmF0ZS1qc0AyLjEuMi9kaXN0L2xpYnNhbXBsZXJhdGUud29ya2xldC5qc1wiKSxhd2FpdCBlLmF1ZGlvV29ya2xldC5hZGRNb2R1bGUobyksbj1hd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSh7YXVkaW86e3NhbXBsZVJhdGU6e2lkZWFsOnR9LGVjaG9DYW5jZWxsYXRpb246e2lkZWFsOiEwfSxub2lzZVN1cHByZXNzaW9uOntpZGVhbDohMH19fSk7Y29uc3Qgcj1lLmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKG4pLGw9bmV3IEF1ZGlvV29ya2xldE5vZGUoZSxcInJhdy1hdWRpby1wcm9jZXNzb3JcIik7cmV0dXJuIHIuY29ubmVjdChpKSxpLmNvbm5lY3QobCksbmV3IGEoZSxpLGwsbil9Y2F0Y2godCl7dmFyIHMsaTt0aHJvdyBudWxsPT0ocz1uKXx8cy5nZXRUcmFja3MoKS5mb3JFYWNoKHQ9PnQuc3RvcCgpKSxudWxsPT0oaT1lKXx8aS5jbG9zZSgpLHR9fWNvbnN0cnVjdG9yKHQsZSxuLHMpe3RoaXMuY29udGV4dD12b2lkIDAsdGhpcy5hbmFseXNlcj12b2lkIDAsdGhpcy53b3JrbGV0PXZvaWQgMCx0aGlzLmlucHV0U3RyZWFtPXZvaWQgMCx0aGlzLmNvbnRleHQ9dCx0aGlzLmFuYWx5c2VyPWUsdGhpcy53b3JrbGV0PW4sdGhpcy5pbnB1dFN0cmVhbT1zfWFzeW5jIGNsb3NlKCl7dGhpcy5pbnB1dFN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKHQ9PnQuc3RvcCgpKSxhd2FpdCB0aGlzLmNvbnRleHQuY2xvc2UoKX19Y29uc3QgaT1uZXcgQmxvYihbJ1xcbiAgICAgIGNsYXNzIEF1ZGlvQ29uY2F0UHJvY2Vzc29yIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29yIHtcXG4gICAgICAgIGNvbnN0cnVjdG9yKCkge1xcbiAgICAgICAgICBzdXBlcigpO1xcbiAgICAgICAgICB0aGlzLmJ1ZmZlcnMgPSBbXTsgLy8gSW5pdGlhbGl6ZSBhbiBlbXB0eSBidWZmZXJcXG4gICAgICAgICAgdGhpcy5jdXJzb3IgPSAwO1xcbiAgICAgICAgICB0aGlzLmN1cnJlbnRCdWZmZXIgPSBudWxsO1xcbiAgICAgICAgICB0aGlzLndhc0ludGVycnVwdGVkID0gZmFsc2U7XFxuICAgICAgICAgIHRoaXMuZmluaXNoZWQgPSBmYWxzZTtcXG5cXG4gICAgICAgICAgdGhpcy5wb3J0Lm9ubWVzc2FnZSA9ICh7IGRhdGEgfSkgPT4ge1xcbiAgICAgICAgICAgIHN3aXRjaCAoZGF0YS50eXBlKSB7XFxuICAgICAgICAgICAgICBjYXNlIFwiYnVmZmVyXCI6XFxuICAgICAgICAgICAgICAgIHRoaXMud2FzSW50ZXJydXB0ZWQgPSBmYWxzZTtcXG4gICAgICAgICAgICAgICAgdGhpcy5idWZmZXJzLnB1c2gobmV3IEludDE2QXJyYXkoZGF0YS5idWZmZXIpKTtcXG4gICAgICAgICAgICAgICAgYnJlYWs7XFxuICAgICAgICAgICAgICBjYXNlIFwiaW50ZXJydXB0XCI6XFxuICAgICAgICAgICAgICAgIHRoaXMud2FzSW50ZXJydXB0ZWQgPSB0cnVlO1xcbiAgICAgICAgICAgICAgICBicmVhaztcXG4gICAgICAgICAgICAgIGNhc2UgXCJjbGVhckludGVycnVwdGVkXCI6XFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLndhc0ludGVycnVwdGVkKSB7XFxuICAgICAgICAgICAgICAgICAgdGhpcy53YXNJbnRlcnJ1cHRlZCA9IGZhbHNlO1xcbiAgICAgICAgICAgICAgICAgIHRoaXMuYnVmZmVycyA9IFtdO1xcbiAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEJ1ZmZlciA9IG51bGw7XFxuICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICB9XFxuICAgICAgICAgIH07XFxuICAgICAgICB9XFxuICAgICAgICBwcm9jZXNzKF8sIG91dHB1dHMpIHtcXG4gICAgICAgICAgbGV0IGZpbmlzaGVkID0gZmFsc2U7XFxuICAgICAgICAgIGNvbnN0IG91dHB1dCA9IG91dHB1dHNbMF1bMF07XFxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3V0cHV0Lmxlbmd0aDsgaSsrKSB7XFxuICAgICAgICAgICAgaWYgKCF0aGlzLmN1cnJlbnRCdWZmZXIpIHtcXG4gICAgICAgICAgICAgIGlmICh0aGlzLmJ1ZmZlcnMubGVuZ3RoID09PSAwKSB7XFxuICAgICAgICAgICAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcXG4gICAgICAgICAgICAgICAgYnJlYWs7XFxuICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRCdWZmZXIgPSB0aGlzLmJ1ZmZlcnMuc2hpZnQoKTtcXG4gICAgICAgICAgICAgIHRoaXMuY3Vyc29yID0gMDtcXG4gICAgICAgICAgICB9XFxuXFxuICAgICAgICAgICAgb3V0cHV0W2ldID0gdGhpcy5jdXJyZW50QnVmZmVyW3RoaXMuY3Vyc29yXSAvIDMyNzY4O1xcbiAgICAgICAgICAgIHRoaXMuY3Vyc29yKys7XFxuXFxuICAgICAgICAgICAgaWYgKHRoaXMuY3Vyc29yID49IHRoaXMuY3VycmVudEJ1ZmZlci5sZW5ndGgpIHtcXG4gICAgICAgICAgICAgIHRoaXMuY3VycmVudEJ1ZmZlciA9IG51bGw7XFxuICAgICAgICAgICAgfVxcbiAgICAgICAgICB9XFxuXFxuICAgICAgICAgIGlmICh0aGlzLmZpbmlzaGVkICE9PSBmaW5pc2hlZCkge1xcbiAgICAgICAgICAgIHRoaXMuZmluaXNoZWQgPSBmaW5pc2hlZDtcXG4gICAgICAgICAgICB0aGlzLnBvcnQucG9zdE1lc3NhZ2UoeyB0eXBlOiBcInByb2Nlc3NcIiwgZmluaXNoZWQgfSk7XFxuICAgICAgICAgIH1cXG5cXG4gICAgICAgICAgcmV0dXJuIHRydWU7IC8vIENvbnRpbnVlIHByb2Nlc3NpbmdcXG4gICAgICAgIH1cXG4gICAgICB9XFxuXFxuICAgICAgcmVnaXN0ZXJQcm9jZXNzb3IoXCJhdWRpby1jb25jYXQtcHJvY2Vzc29yXCIsIEF1ZGlvQ29uY2F0UHJvY2Vzc29yKTtcXG4gICAgJ10se3R5cGU6XCJhcHBsaWNhdGlvbi9qYXZhc2NyaXB0XCJ9KSxyPVVSTC5jcmVhdGVPYmplY3RVUkwoaSk7Y2xhc3MgbHtzdGF0aWMgYXN5bmMgY3JlYXRlKHQpe2xldCBlPW51bGw7dHJ5e2U9bmV3IEF1ZGlvQ29udGV4dCh7c2FtcGxlUmF0ZTp0fSk7Y29uc3Qgbj1lLmNyZWF0ZUFuYWx5c2VyKCkscz1lLmNyZWF0ZUdhaW4oKTtzLmNvbm5lY3Qobiksbi5jb25uZWN0KGUuZGVzdGluYXRpb24pLGF3YWl0IGUuYXVkaW9Xb3JrbGV0LmFkZE1vZHVsZShyKTtjb25zdCBvPW5ldyBBdWRpb1dvcmtsZXROb2RlKGUsXCJhdWRpby1jb25jYXQtcHJvY2Vzc29yXCIpO3JldHVybiBvLmNvbm5lY3QocyksbmV3IGwoZSxuLHMsbyl9Y2F0Y2godCl7dmFyIG47dGhyb3cgbnVsbD09KG49ZSl8fG4uY2xvc2UoKSx0fX1jb25zdHJ1Y3Rvcih0LGUsbixzKXt0aGlzLmNvbnRleHQ9dm9pZCAwLHRoaXMuYW5hbHlzZXI9dm9pZCAwLHRoaXMuZ2Fpbj12b2lkIDAsdGhpcy53b3JrbGV0PXZvaWQgMCx0aGlzLmNvbnRleHQ9dCx0aGlzLmFuYWx5c2VyPWUsdGhpcy5nYWluPW4sdGhpcy53b3JrbGV0PXN9YXN5bmMgY2xvc2UoKXthd2FpdCB0aGlzLmNvbnRleHQuY2xvc2UoKX19ZnVuY3Rpb24gYyh0KXtyZXR1cm4hIXQudHlwZX1jbGFzcyB1e3N0YXRpYyBhc3luYyBjcmVhdGUodCl7bGV0IGU9bnVsbDt0cnl7dmFyIG47Y29uc3Qgcz1udWxsIT0obj10Lm9yaWdpbik/bjpcIndzczovL2FwaS5lbGV2ZW5sYWJzLmlvXCIsbz10LnNpZ25lZFVybD90LnNpZ25lZFVybDpzK1wiL3YxL2NvbnZhaS9jb252ZXJzYXRpb24/YWdlbnRfaWQ9XCIrdC5hZ2VudElkLGE9W1wiY29udmFpXCJdO3QuYXV0aG9yaXphdGlvbiYmYS5wdXNoKGBiZWFyZXIuJHt0LmF1dGhvcml6YXRpb259YCksZT1uZXcgV2ViU29ja2V0KG8sYSk7Y29uc3QgaT1hd2FpdCBuZXcgUHJvbWlzZSgobixzKT0+e2UuYWRkRXZlbnRMaXN0ZW5lcihcIm9wZW5cIiwoKT0+e3ZhciBuO2NvbnN0IHM9e3R5cGU6XCJjb252ZXJzYXRpb25faW5pdGlhdGlvbl9jbGllbnRfZGF0YVwifTt2YXIgbyxhLGkscjt0Lm92ZXJyaWRlcyYmKHMuY29udmVyc2F0aW9uX2NvbmZpZ19vdmVycmlkZT17YWdlbnQ6e3Byb21wdDpudWxsPT0obz10Lm92ZXJyaWRlcy5hZ2VudCk/dm9pZCAwOm8ucHJvbXB0LGZpcnN0X21lc3NhZ2U6bnVsbD09KGE9dC5vdmVycmlkZXMuYWdlbnQpP3ZvaWQgMDphLmZpcnN0TWVzc2FnZSxsYW5ndWFnZTpudWxsPT0oaT10Lm92ZXJyaWRlcy5hZ2VudCk/dm9pZCAwOmkubGFuZ3VhZ2V9LHR0czp7dm9pY2VfaWQ6bnVsbD09KHI9dC5vdmVycmlkZXMudHRzKT92b2lkIDA6ci52b2ljZUlkfX0pLHQuY3VzdG9tTGxtRXh0cmFCb2R5JiYocy5jdXN0b21fbGxtX2V4dHJhX2JvZHk9dC5jdXN0b21MbG1FeHRyYUJvZHkpLG51bGw9PShuPWUpfHxuLnNlbmQoSlNPTi5zdHJpbmdpZnkocykpfSx7b25jZTohMH0pLGUuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIscyksZS5hZGRFdmVudExpc3RlbmVyKFwiY2xvc2VcIixzKSxlLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsdD0+e2NvbnN0IGU9SlNPTi5wYXJzZSh0LmRhdGEpO2MoZSkmJihcImNvbnZlcnNhdGlvbl9pbml0aWF0aW9uX21ldGFkYXRhXCI9PT1lLnR5cGU/bihlLmNvbnZlcnNhdGlvbl9pbml0aWF0aW9uX21ldGFkYXRhX2V2ZW50KTpjb25zb2xlLndhcm4oXCJGaXJzdCByZWNlaXZlZCBtZXNzYWdlIGlzIG5vdCBjb252ZXJzYXRpb24gbWV0YWRhdGEuXCIpKX0se29uY2U6ITB9KX0pLHI9aS5jb252ZXJzYXRpb25faWQsbD1wYXJzZUludChpLmFnZW50X291dHB1dF9hdWRpb19mb3JtYXQucmVwbGFjZShcInBjbV9cIixcIlwiKSk7cmV0dXJuIG5ldyB1KGUscixsKX1jYXRjaCh0KXt2YXIgczt0aHJvdyBudWxsPT0ocz1lKXx8cy5jbG9zZSgpLHR9fWNvbnN0cnVjdG9yKHQsZSxuKXt0aGlzLnNvY2tldD12b2lkIDAsdGhpcy5jb252ZXJzYXRpb25JZD12b2lkIDAsdGhpcy5zYW1wbGVSYXRlPXZvaWQgMCx0aGlzLnNvY2tldD10LHRoaXMuY29udmVyc2F0aW9uSWQ9ZSx0aGlzLnNhbXBsZVJhdGU9bn1jbG9zZSgpe3RoaXMuc29ja2V0LmNsb3NlKCl9c2VuZE1lc3NhZ2UodCl7dGhpcy5zb2NrZXQuc2VuZChKU09OLnN0cmluZ2lmeSh0KSl9fWNvbnN0IGg9e2NsaWVudFRvb2xzOnt9fSxkPXtvbkNvbm5lY3Q6KCk9Pnt9LG9uRGVidWc6KCk9Pnt9LG9uRGlzY29ubmVjdDooKT0+e30sb25FcnJvcjooKT0+e30sb25NZXNzYWdlOigpPT57fSxvbk1vZGVDaGFuZ2U6KCk9Pnt9LG9uU3RhdHVzQ2hhbmdlOigpPT57fX07Y2xhc3MgcHtzdGF0aWMgYXN5bmMgc3RhcnRTZXNzaW9uKGUpe2NvbnN0IG49dCh7fSxoLGQsZSk7bi5vblN0YXR1c0NoYW5nZSh7c3RhdHVzOlwiY29ubmVjdGluZ1wifSk7bGV0IHM9bnVsbCxvPW51bGwsaT1udWxsO3RyeXtyZXR1cm4gcz1hd2FpdCBhLmNyZWF0ZSgxNmUzKSxvPWF3YWl0IHUuY3JlYXRlKGUpLGk9YXdhaXQgbC5jcmVhdGUoby5zYW1wbGVSYXRlKSxuZXcgcChuLG8scyxpKX1jYXRjaCh0KXt2YXIgcixjLGY7dGhyb3cgbi5vblN0YXR1c0NoYW5nZSh7c3RhdHVzOlwiZGlzY29ubmVjdGVkXCJ9KSxudWxsPT0ocj1vKXx8ci5jbG9zZSgpLGF3YWl0KG51bGw9PShjPXMpP3ZvaWQgMDpjLmNsb3NlKCkpLGF3YWl0KG51bGw9PShmPWkpP3ZvaWQgMDpmLmNsb3NlKCkpLHR9fWNvbnN0cnVjdG9yKHQscyxvLGEpe3ZhciBpPXRoaXM7dGhpcy5vcHRpb25zPXZvaWQgMCx0aGlzLmNvbm5lY3Rpb249dm9pZCAwLHRoaXMuaW5wdXQ9dm9pZCAwLHRoaXMub3V0cHV0PXZvaWQgMCx0aGlzLmxhc3RJbnRlcnJ1cHRUaW1lc3RhbXA9MCx0aGlzLm1vZGU9XCJsaXN0ZW5pbmdcIix0aGlzLnN0YXR1cz1cImNvbm5lY3RpbmdcIix0aGlzLmlucHV0RnJlcXVlbmN5RGF0YT12b2lkIDAsdGhpcy5vdXRwdXRGcmVxdWVuY3lEYXRhPXZvaWQgMCx0aGlzLnZvbHVtZT0xLHRoaXMuZW5kU2Vzc2lvbj1hc3luYyBmdW5jdGlvbigpe1wiY29ubmVjdGVkXCI9PT1pLnN0YXR1cyYmKGkudXBkYXRlU3RhdHVzKFwiZGlzY29ubmVjdGluZ1wiKSxpLmNvbm5lY3Rpb24uY2xvc2UoKSxhd2FpdCBpLmlucHV0LmNsb3NlKCksYXdhaXQgaS5vdXRwdXQuY2xvc2UoKSxpLnVwZGF0ZVN0YXR1cyhcImRpc2Nvbm5lY3RlZFwiKSl9LHRoaXMudXBkYXRlTW9kZT10PT57dCE9PXRoaXMubW9kZSYmKHRoaXMubW9kZT10LHRoaXMub3B0aW9ucy5vbk1vZGVDaGFuZ2Uoe21vZGU6dH0pKX0sdGhpcy51cGRhdGVTdGF0dXM9dD0+e3QhPT10aGlzLnN0YXR1cyYmKHRoaXMuc3RhdHVzPXQsdGhpcy5vcHRpb25zLm9uU3RhdHVzQ2hhbmdlKHtzdGF0dXM6dH0pKX0sdGhpcy5vbkV2ZW50PWFzeW5jIGZ1bmN0aW9uKHQpe3RyeXtjb25zdCBuPUpTT04ucGFyc2UodC5kYXRhKTtpZighYyhuKSlyZXR1cm47c3dpdGNoKG4udHlwZSl7Y2FzZVwiaW50ZXJydXB0aW9uXCI6bi5pbnRlcnJ1cHRpb25fZXZlbnQmJihpLmxhc3RJbnRlcnJ1cHRUaW1lc3RhbXA9bi5pbnRlcnJ1cHRpb25fZXZlbnQuZXZlbnRfaWQpLGkuZmFkZU91dEF1ZGlvKCk7YnJlYWs7Y2FzZVwiYWdlbnRfcmVzcG9uc2VcIjppLm9wdGlvbnMub25NZXNzYWdlKHtzb3VyY2U6XCJhaVwiLG1lc3NhZ2U6bi5hZ2VudF9yZXNwb25zZV9ldmVudC5hZ2VudF9yZXNwb25zZX0pO2JyZWFrO2Nhc2VcInVzZXJfdHJhbnNjcmlwdFwiOmkub3B0aW9ucy5vbk1lc3NhZ2Uoe3NvdXJjZTpcInVzZXJcIixtZXNzYWdlOm4udXNlcl90cmFuc2NyaXB0aW9uX2V2ZW50LnVzZXJfdHJhbnNjcmlwdH0pO2JyZWFrO2Nhc2VcImludGVybmFsX3RlbnRhdGl2ZV9hZ2VudF9yZXNwb25zZVwiOmkub3B0aW9ucy5vbkRlYnVnKHt0eXBlOlwidGVudGF0aXZlX2FnZW50X3Jlc3BvbnNlXCIscmVzcG9uc2U6bi50ZW50YXRpdmVfYWdlbnRfcmVzcG9uc2VfaW50ZXJuYWxfZXZlbnQudGVudGF0aXZlX2FnZW50X3Jlc3BvbnNlfSk7YnJlYWs7Y2FzZVwiY2xpZW50X3Rvb2xfY2FsbFwiOmlmKGkub3B0aW9ucy5jbGllbnRUb29scy5oYXNPd25Qcm9wZXJ0eShuLmNsaWVudF90b29sX2NhbGwudG9vbF9uYW1lKSl7dHJ5e3ZhciBlO2NvbnN0IHQ9bnVsbCE9KGU9YXdhaXQgaS5vcHRpb25zLmNsaWVudFRvb2xzW24uY2xpZW50X3Rvb2xfY2FsbC50b29sX25hbWVdKG4uY2xpZW50X3Rvb2xfY2FsbC5wYXJhbWV0ZXJzKSk/ZTpcIkNsaWVudCB0b29sIGV4ZWN1dGlvbiBzdWNjZXNzZnVsLlwiO2kuY29ubmVjdGlvbi5zZW5kTWVzc2FnZSh7dHlwZTpcImNsaWVudF90b29sX3Jlc3VsdFwiLHRvb2xfY2FsbF9pZDpuLmNsaWVudF90b29sX2NhbGwudG9vbF9jYWxsX2lkLHJlc3VsdDp0LGlzX2Vycm9yOiExfSl9Y2F0Y2godCl7aS5vbkVycm9yKFwiQ2xpZW50IHRvb2wgZXhlY3V0aW9uIGZhaWxlZCB3aXRoIGZvbGxvd2luZyBlcnJvcjogXCIrKG51bGw9PXQ/dm9pZCAwOnQubWVzc2FnZSkse2NsaWVudFRvb2xOYW1lOm4uY2xpZW50X3Rvb2xfY2FsbC50b29sX25hbWV9KSxpLmNvbm5lY3Rpb24uc2VuZE1lc3NhZ2Uoe3R5cGU6XCJjbGllbnRfdG9vbF9yZXN1bHRcIix0b29sX2NhbGxfaWQ6bi5jbGllbnRfdG9vbF9jYWxsLnRvb2xfY2FsbF9pZCxyZXN1bHQ6XCJDbGllbnQgdG9vbCBleGVjdXRpb24gZmFpbGVkOiBcIisobnVsbD09dD92b2lkIDA6dC5tZXNzYWdlKSxpc19lcnJvcjohMH0pfWJyZWFrfWlmKGkub3B0aW9ucy5vblVuaGFuZGxlZENsaWVudFRvb2xDYWxsKXtpLm9wdGlvbnMub25VbmhhbmRsZWRDbGllbnRUb29sQ2FsbChuLmNsaWVudF90b29sX2NhbGwpO2JyZWFrfWkub25FcnJvcihgQ2xpZW50IHRvb2wgd2l0aCBuYW1lICR7bi5jbGllbnRfdG9vbF9jYWxsLnRvb2xfbmFtZX0gaXMgbm90IGRlZmluZWQgb24gY2xpZW50YCx7Y2xpZW50VG9vbE5hbWU6bi5jbGllbnRfdG9vbF9jYWxsLnRvb2xfbmFtZX0pLGkuY29ubmVjdGlvbi5zZW5kTWVzc2FnZSh7dHlwZTpcImNsaWVudF90b29sX3Jlc3VsdFwiLHRvb2xfY2FsbF9pZDpuLmNsaWVudF90b29sX2NhbGwudG9vbF9jYWxsX2lkLHJlc3VsdDpgQ2xpZW50IHRvb2wgd2l0aCBuYW1lICR7bi5jbGllbnRfdG9vbF9jYWxsLnRvb2xfbmFtZX0gaXMgbm90IGRlZmluZWQgb24gY2xpZW50YCxpc19lcnJvcjohMH0pO2JyZWFrO2Nhc2VcImF1ZGlvXCI6aS5sYXN0SW50ZXJydXB0VGltZXN0YW1wPD1uLmF1ZGlvX2V2ZW50LmV2ZW50X2lkJiYoaS5hZGRBdWRpb0Jhc2U2NENodW5rKG4uYXVkaW9fZXZlbnQuYXVkaW9fYmFzZV82NCksaS51cGRhdGVNb2RlKFwic3BlYWtpbmdcIikpO2JyZWFrO2Nhc2VcInBpbmdcIjppLmNvbm5lY3Rpb24uc2VuZE1lc3NhZ2Uoe3R5cGU6XCJwb25nXCIsZXZlbnRfaWQ6bi5waW5nX2V2ZW50LmV2ZW50X2lkfSk7YnJlYWs7ZGVmYXVsdDppLm9wdGlvbnMub25EZWJ1ZyhuKX19Y2F0Y2goZSl7cmV0dXJuIHZvaWQgaS5vbkVycm9yKFwiRmFpbGVkIHRvIHBhcnNlIGV2ZW50IGRhdGFcIix7ZXZlbnQ6dH0pfX0sdGhpcy5vbklucHV0V29ya2xldE1lc3NhZ2U9dD0+e1wiY29ubmVjdGVkXCI9PT10aGlzLnN0YXR1cyYmdGhpcy5jb25uZWN0aW9uLnNlbmRNZXNzYWdlKHt1c2VyX2F1ZGlvX2NodW5rOmUodC5kYXRhWzBdLmJ1ZmZlcil9KX0sdGhpcy5vbk91dHB1dFdvcmtsZXRNZXNzYWdlPSh7ZGF0YTp0fSk9PntcInByb2Nlc3NcIj09PXQudHlwZSYmdGhpcy51cGRhdGVNb2RlKHQuZmluaXNoZWQ/XCJsaXN0ZW5pbmdcIjpcInNwZWFraW5nXCIpfSx0aGlzLmFkZEF1ZGlvQmFzZTY0Q2h1bms9YXN5bmMgZnVuY3Rpb24odCl7aS5vdXRwdXQuZ2Fpbi5nYWluLnZhbHVlPWkudm9sdW1lLGkub3V0cHV0LndvcmtsZXQucG9ydC5wb3N0TWVzc2FnZSh7dHlwZTpcImNsZWFySW50ZXJydXB0ZWRcIn0pLGkub3V0cHV0LndvcmtsZXQucG9ydC5wb3N0TWVzc2FnZSh7dHlwZTpcImJ1ZmZlclwiLGJ1ZmZlcjpuKHQpfSl9LHRoaXMuZmFkZU91dEF1ZGlvPWFzeW5jIGZ1bmN0aW9uKCl7aS51cGRhdGVNb2RlKFwibGlzdGVuaW5nXCIpLGkub3V0cHV0LndvcmtsZXQucG9ydC5wb3N0TWVzc2FnZSh7dHlwZTpcImludGVycnVwdFwifSksaS5vdXRwdXQuZ2Fpbi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMWUtNCxpLm91dHB1dC5jb250ZXh0LmN1cnJlbnRUaW1lKzIpLHNldFRpbWVvdXQoKCk9PntpLm91dHB1dC5nYWluLmdhaW4udmFsdWU9aS52b2x1bWUsaS5vdXRwdXQud29ya2xldC5wb3J0LnBvc3RNZXNzYWdlKHt0eXBlOlwiY2xlYXJJbnRlcnJ1cHRlZFwifSl9LDJlMyl9LHRoaXMub25FcnJvcj0odCxlKT0+e2NvbnNvbGUuZXJyb3IodCxlKSx0aGlzLm9wdGlvbnMub25FcnJvcih0LGUpfSx0aGlzLmNhbGN1bGF0ZVZvbHVtZT10PT57aWYoMD09PXQubGVuZ3RoKXJldHVybiAwO2xldCBlPTA7Zm9yKGxldCBuPTA7bjx0Lmxlbmd0aDtuKyspZSs9dFtuXS8yNTU7cmV0dXJuIGUvPXQubGVuZ3RoLGU8MD8wOmU+MT8xOmV9LHRoaXMuZ2V0SWQ9KCk9PnRoaXMuY29ubmVjdGlvbi5jb252ZXJzYXRpb25JZCx0aGlzLnNldFZvbHVtZT0oe3ZvbHVtZTp0fSk9Pnt0aGlzLnZvbHVtZT10fSx0aGlzLmdldElucHV0Qnl0ZUZyZXF1ZW5jeURhdGE9KCk9PihudWxsIT10aGlzLmlucHV0RnJlcXVlbmN5RGF0YXx8KHRoaXMuaW5wdXRGcmVxdWVuY3lEYXRhPW5ldyBVaW50OEFycmF5KHRoaXMuaW5wdXQuYW5hbHlzZXIuZnJlcXVlbmN5QmluQ291bnQpKSx0aGlzLmlucHV0LmFuYWx5c2VyLmdldEJ5dGVGcmVxdWVuY3lEYXRhKHRoaXMuaW5wdXRGcmVxdWVuY3lEYXRhKSx0aGlzLmlucHV0RnJlcXVlbmN5RGF0YSksdGhpcy5nZXRPdXRwdXRCeXRlRnJlcXVlbmN5RGF0YT0oKT0+KG51bGwhPXRoaXMub3V0cHV0RnJlcXVlbmN5RGF0YXx8KHRoaXMub3V0cHV0RnJlcXVlbmN5RGF0YT1uZXcgVWludDhBcnJheSh0aGlzLm91dHB1dC5hbmFseXNlci5mcmVxdWVuY3lCaW5Db3VudCkpLHRoaXMub3V0cHV0LmFuYWx5c2VyLmdldEJ5dGVGcmVxdWVuY3lEYXRhKHRoaXMub3V0cHV0RnJlcXVlbmN5RGF0YSksdGhpcy5vdXRwdXRGcmVxdWVuY3lEYXRhKSx0aGlzLmdldElucHV0Vm9sdW1lPSgpPT50aGlzLmNhbGN1bGF0ZVZvbHVtZSh0aGlzLmdldElucHV0Qnl0ZUZyZXF1ZW5jeURhdGEoKSksdGhpcy5nZXRPdXRwdXRWb2x1bWU9KCk9PnRoaXMuY2FsY3VsYXRlVm9sdW1lKHRoaXMuZ2V0T3V0cHV0Qnl0ZUZyZXF1ZW5jeURhdGEoKSksdGhpcy5vcHRpb25zPXQsdGhpcy5jb25uZWN0aW9uPXMsdGhpcy5pbnB1dD1vLHRoaXMub3V0cHV0PWEsdGhpcy5vcHRpb25zLm9uQ29ubmVjdCh7Y29udmVyc2F0aW9uSWQ6cy5jb252ZXJzYXRpb25JZH0pLHRoaXMuY29ubmVjdGlvbi5zb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIix0PT57dGhpcy5vbkV2ZW50KHQpfSksdGhpcy5jb25uZWN0aW9uLnNvY2tldC5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIix0PT57dGhpcy51cGRhdGVTdGF0dXMoXCJkaXNjb25uZWN0ZWRcIiksdGhpcy5vbkVycm9yKFwiU29ja2V0IGVycm9yXCIsdCl9KSx0aGlzLmNvbm5lY3Rpb24uc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbG9zZVwiLCgpPT57dGhpcy51cGRhdGVTdGF0dXMoXCJkaXNjb25uZWN0ZWRcIiksdGhpcy5vcHRpb25zLm9uRGlzY29ubmVjdCgpfSksdGhpcy5pbnB1dC53b3JrbGV0LnBvcnQub25tZXNzYWdlPXRoaXMub25JbnB1dFdvcmtsZXRNZXNzYWdlLHRoaXMub3V0cHV0LndvcmtsZXQucG9ydC5vbm1lc3NhZ2U9dGhpcy5vbk91dHB1dFdvcmtsZXRNZXNzYWdlLHRoaXMudXBkYXRlU3RhdHVzKFwiY29ubmVjdGVkXCIpfX1leHBvcnR7cCBhcyBDb252ZXJzYXRpb259O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGliLm1vZGVybi5qcy5tYXBcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@11labs+client@0.0.4/node_modules/@11labs/client/dist/lib.modern.js\n");

/***/ })

};
;