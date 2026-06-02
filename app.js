// 1. DATA MOCK (Simulasi Database)
let dataPendaftar = [
    { id: 1, nama: "Budi Santoso", nim: "22010101", status: "Terverifikasi" },
    { id: 2, nama: "Siti Rahma", nim: "22010102", status: "Pending" }
];

let dataBeasiswa = [
    { id: 1, namaBeasiswa: "Beasiswa Prestasi Unggul", kuota: "50 Mahasiswa", dana: "Rp 5.000.000/Smt" },
    { id: 2, namaBeasiswa: "Bantuan Dana Riset", kuota: "10 Mahasiswa", dana: "Rp 10.000.000/Mhs" }
];

let dataDokumen = [
    { id: 1, namaMhs: "Budi Santoso", jenis: "Transkrip Nilai", status: "Lengkap" },
    { id: 2, namaMhs: "Siti Rahma", jenis: "Surat Keterangan Tidak Mampu", status: "Perlu Direvisi" }
];

let dataPencarian = [
    { id: 1, target: "Beasiswa Unggul", terdistribusi: "Rp 250.000.000", sisa: "Rp 0" },
    { id: 2, target: "Dana Riset", terdistribusi: "Rp 50.000.000", sisa: "Rp 50.000.000" }
];

let currentTab = 'pendaftar';
let currentRole = localStorage.getItem('currentRole') || 'Mahasiswa';
let editId = null;

// 2. INITIALIZATION RUN WHEN PAGE LOADS
window.onload = function() {
    document.getElementById('userBadge').innerText = `Role: ${currentRole}`;
    applyRolePermissions();
    renderTable();
    initChart();
};

// 3. FITUR AUTENTIKASI (PEMBATASAN AKSES BERDASARKAN ROLE)
function applyRolePermissions() {
    const btnTambah = document.getElementById('btnTambahData');
    
    // Mahasiswa hanya bisa melihat data & mengelola dokumennya sendiri
    if (currentRole === 'Mahasiswa') {
        btnTambah.innerText = "+ Ajukan Dokumen Baru";
        switchTab('dokumen'); // Default tab untuk mahasiswa
    } else if (currentRole === 'Verifikator') {
        btnTambah.classList.add('hidden'); // Verifikator tidak bisa tambah beasiswa/pendaftar, hanya memvalidasi
    } else {
        btnTambah.classList.remove('hidden');
        btnTambah.innerText = "+ Tambah Data Baru";
    }
}

// 4. LOGIKA NAVIGASI TAB ENTITAS
function switchTab(tabName) {
    currentTab = tabName;
    const tabs = ['pendaftar', 'beasiswa', 'dokumen', 'pencarian'];
    
    tabs.forEach(t => {
        const el = document.getElementById(`tab-${t}`);
        if(t === tabName) {
            el.className = "py-2 px-4 text-blue-600 border-b-2 border-blue-600 font-medium";
        } else {
            el.className = "py-2 px-4 text-gray-500 hover:text-blue-600 font-medium";
        }
    });

    renderTable();
}

// 5. RENDER TABEL DINAMIS (READ)
function renderTable() {
    const tbody = document.getElementById('tableBody');
    const th1 = document.getElementById('th-1');
    const th2 = document.getElementById('th-2');
    const th3 = document.getElementById('th-3');
    tbody.innerHTML = "";

    if (currentTab === 'pendaftar') {
        th1.innerText = "Nama Pendaftar"; th2.innerText = "NIM"; th3.innerText = "Status";
        dataPendaftar.forEach(item => {
            tbody.innerHTML += `
                <tr class="hover:bg-gray-50">
                    <td class="p-4 font-medium text-gray-900">${item.nama}</td>
                    <td class="p-4">${item.nim}</td>
                    <td class="p-4"><span class="px-2 py-1 rounded text-xs ${item.status === 'Terverifikasi' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">${item.status}</span></td>
                    <td class="p-4">${getActionsHTML(item.id)}</td>
                </tr>`;
        });
    } else if (currentTab === 'beasiswa') {
        th1.innerText = "Nama Beasiswa"; th2.innerText = "Kuota"; th3.innerText = "Besaran Dana";
        dataBeasiswa.forEach(item => {
            tbody.innerHTML += `
                <tr class="hover:bg-gray-50">
                    <td class="p-4 font-medium text-gray-900">${item.namaBeasiswa}</td>
                    <td class="p-4">${item.kuota}</td>
                    <td class="p-4 text-green-600 font-semibold">${item.dana}</td>
                    <td class="p-4">${getActionsHTML(item.id)}</td>
                </tr>`;
        });
    } else if (currentTab === 'dokumen') {
        th1.innerText = "Pemilik Dokumen"; th2.innerText = "Jenis Dokumen"; th3.innerText = "Status Berkas";
        dataDokumen.forEach(item => {
            tbody.innerHTML += `
                <tr class="hover:bg-gray-50">
                    <td class="p-4 font-medium text-gray-900">${item.namaMhs}</td>
                    <td class="p-4">${item.jenis}</td>
                    <td class="p-4"><span class="px-2 py-1 rounded text-xs ${item.status === 'Lengkap' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">${item.status}</span></td>
                    <td class="p-4">${getActionsHTML(item.id)}</td>
                </tr>`;
        });
    } else if (currentTab === 'pencarian') {
        th1.innerText = "Kategori Alokasi"; th2.innerText = "Dana Disalurkan"; th3.innerText = "Sisa Anggaran";
        dataPencarian.forEach(item => {
            tbody.innerHTML += `
                <tr class="hover:bg-gray-50">
                    <td class="p-4 font-medium text-gray-900">${item.target}</td>
                    <td class="p-4 text-green-600">${item.terdistribusi}</td>
                    <td class="p-4 text-gray-500">${item.sisa}</td>
                    <td class="p-4">${getActionsHTML(item.id)}</td>
                </tr>`;
        });
    }
}

// Menghasilkan tombol edit/hapus sesuai hak akses role
function getActionsHTML(id) {
    if (currentRole === 'Verifikator') {
        return `<button onclick="editData(${id})" class="text-blue-600 hover:underline font-medium">Verifikasi Berkas</button>`;
    }
    return `
        <button onclick="editData(${id})" class="text-yellow-600 hover:underline mr-3">Edit</button>
        <button onclick="deleteData(${id})" class="text-red-600 hover:underline">Hapus</button>
    `;
}

// 6. LOGIKA MODAL & FORM (CREATE & UPDATE SIMULATION)
function openModal() {
    document.getElementById('crudModal').classList.remove('hidden');
    document.getElementById('modalTitle').innerText = `Tambah Data ${currentTab}`;
    setupFormLabels();
}

function closeModal() {
    document.getElementById('crudModal').classList.add('hidden');
    editId = null;
    document.getElementById('input1').value = '';
    document.getElementById('input2').value = '';
    document.getElementById('input3').value = '';
}

function setupFormLabels() {
    if(currentTab === 'pendaftar') {
        setLabels("Nama", "NIM", "Status");
    } else if(currentTab === 'beasiswa') {
        setLabels("Nama Beasiswa", "Kuota", "Besaran Dana");
    } else if(currentTab === 'dokumen') {
        setLabels("Nama Mahasiswa", "Jenis Dokumen", "Status Kelengkapan");
    } else if(currentTab === 'pencarian') {
        setLabels("Kategori Alokasi", "Dana Disalurkan", "Sisa Anggaran");
    }
}

function setLabels(l1, l2, l3) {
    document.getElementById('lblInput1').innerText = l1;
    document.getElementById('lblInput2').innerText = l2;
    document.getElementById('lblInput3').innerText = l3;
}

function handleFormSubmit(e) {
    e.preventDefault();
    const v1 = document.getElementById('input1').value;
    const v2 = document.getElementById('input2').value;
    const v3 = document.getElementById('input3').value;

    let targetArray = currentTab === 'pendaftar' ? dataPendaftar : 
                      currentTab === 'beasiswa' ? dataBeasiswa : 
                      currentTab === 'dokumen' ? dataDokumen : dataPencarian;

    if (editId) {
        // Mode Update
        let item = targetArray.find(x => x.id === editId);
        let keys = Object.keys(item);
        item[keys[1]] = v1;
        item[keys[2]] = v2;
        item[keys[3]] = v3;
    } else {
        // Mode Create
        let newId = targetArray.length > 0 ? targetArray[targetArray.length - 1].id + 1 : 1;
        let keys = Object.keys(targetArray[0] || {id: 0, a:'', b:'', c:''});
        let newItem = { id: newId };
        newItem[keys[1]] = v1;
        newItem[keys[2]] = v2;
        newItem[keys[3]] = v3;
        targetArray.push(newItem);
    }

    closeModal();
    renderTable();
}

function editData(id) {
    editId = id;
    let targetArray = currentTab === 'pendaftar' ? dataPendaftar : 
                      currentTab === 'beasiswa' ? dataBeasiswa : 
                      currentTab === 'dokumen' ? dataDokumen : dataPencarian;
    
    let item = targetArray.find(x => x.id === id);
    let keys = Object.keys(item);

    openModal();
    document.getElementById('modalTitle').innerText = `Edit Data ${currentTab}`;
    document.getElementById('input1').value = item[keys[1]];
    document.getElementById('input2').value = item[keys[2]];
    document.getElementById('input3').value = item[keys[3]];
}

// 7. LOGIKA DELETE (DELETE SIMULATION)
function deleteData(id) {
    if(confirm("Apakah Anda yakin ingin menghapus data ini?")) {
        if (currentTab === 'pendaftar') dataPendaftar = dataPendaftar.filter(x => x.id !== id);
        if (currentTab === 'beasiswa') dataBeasiswa = dataBeasiswa.filter(x => x.id !== id);
        if (currentTab === 'dokumen') dataDokumen = dataDokumen.filter(x => x.id !== id);
        if (currentTab === 'pencarian') dataPencarian = dataPencarian.filter(x => x.id !== id);
        renderTable();
    }
}

// 8. INITIALIZE CHART (FOKUS DASHBOARD VISUALIZATION)
function initChart() {
    const ctx = document.getElementById('dashboardChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Dana Beasiswa Prestasi', 'Dana Riset', 'Dana Sisa Alokasi'],
            datasets: [{
                data: [60, 25, 15],
                backgroundColor: ['#2563EB', '#16A34A', '#D1D5DB'],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}