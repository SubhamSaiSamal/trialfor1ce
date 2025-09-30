@@ .. @@
   const sendToBrailleEmbosser = async (brailleText: string) => {
     if (!writer || !isConnected) {
       throw new Error('Embosser not connected');
     }
 
     try {
       setIsSending(true);
-      const data = new TextEncoder().encode(brailleText);
+      // Send braille text with newline terminator for Arduino processing
+      const data = new TextEncoder().encode(brailleText + '\n');
       await writer.write(data);
       
       addLog(`Sent ${brailleText.length} characters to embosser`);
+      addLog(`Data: ${brailleText.substring(0, 50)}${brailleText.length > 50 ? '...' : ''}`);
       
       // Optional: Wait for Arduino acknowledgment
       setTimeout(() => {
         addLog('Embossing in progress...');
       }, 1000);
       
     } catch (error) {
       addLog(`Send error: ${error}`);
       throw error;
     } finally {
       setIsSending(false);
     }
   };