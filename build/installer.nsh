!macro customInit
  ; Workaround for installer handing when the app directory is removed manually
  ${ifNot} ${FileExists} "$INSTDIR"
    DeleteRegKey HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\${UNINSTALL_APP_KEY}"
    DeleteRegKey HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\{${UNINSTALL_APP_KEY}}"
  ${EndIf}
!macroend

