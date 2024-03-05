function addData(form) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('NamaSheet'); // Ganti NamaSheet dengan nama sheet yang diinginkan

  var tanggal = form.tanggal;
  var idPelanggan = form.idPelanggan;
  var nama = form.nama;
  var alamat = form.alamat;
  var jenisKegiatan = form.jenisKegiatan;
  var fotoSebelum = form.fotoSebelum;
  var fotoSesudah = form.fotoSesudah;

  // Lakukan validasi ID Pelanggan di sheet Google
  var data = sheet.getDataRange().getValues();
  var idPelangganExist = false;
  for (var i = 1; i < data.length; i++) {
    if (data[i][1] === idPelanggan) { // Kolom ID Pelanggan berada di kolom kedua, ganti dengan yang sesuai
      idPelangganExist = true;
      break;
    }
  }

  if (idPelangganExist) {
    SpreadsheetApp.getUi().alert('ID Pelanggan sudah ada. Harap masukkan ID yang unik.');
    return;
  }

  // Lakukan penyimpanan data ke spreadsheet
  var lastRow = sheet.getLastRow() + 1;
  sheet.getRange(lastRow, 1).setValue(tanggal);
  sheet.getRange(lastRow, 2).setValue(idPelanggan);
  sheet.getRange(lastRow, 3).setValue(nama);
  sheet.getRange(lastRow, 4).setValue(alamat);
  sheet.getRange(lastRow, 5).setValue(jenisKegiatan);

  // Simpan fotoSebelum dan fotoSesudah di Google Drive dan dapatkan link alamatnya
  var folder = DriveApp.getFolderById('IDFolder'); // Ganti IDFolder dengan ID folder Google Drive tempat menyimpan foto
  var fotoSebelumFile = folder.createFile(fotoSebelum);
  var fotoSesudahFile = folder.createFile(fotoSesudah);

  var fotoSebelumLink = fotoSebelumFile.getUrl();
  var fotoSesudahLink = fotoSesudahFile.getUrl();

  sheet.getRange(lastRow, 6).setValue(fotoSebelumLink);
  sheet.getRange(lastRow, 7).setValue(fotoSesudahLink);

  SpreadsheetApp.getUi().alert('Data berhasil disimpan.');
}