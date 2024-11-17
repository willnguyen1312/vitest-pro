use criterion::{criterion_group, criterion_main, Criterion};
use rayon::prelude::*;
use walkdir::WalkDir;

const PATH: &str = "/Users/namnguyen/vn/personal/vitest-pro/test";

fn collect_ts_files_seq() -> Vec<std::path::PathBuf> {
    WalkDir::new(PATH)
        .into_iter()
        .filter_map(|e| e.ok())
        .filter(|e| {
            !e.path()
                .components()
                .any(|c| c.as_os_str() == "node_modules")
        })
        .filter(|e| {
            e.path()
                .extension()
                .map_or(false, |ext| ext == "ts" || ext == "tsx")
        })
        .map(|e| e.path().to_owned())
        .collect()
}

fn collect_ts_files_par() -> Vec<std::path::PathBuf> {
    // Fixed PATH string to use constant
    let entries: Vec<_> = WalkDir::new(PATH)
        .into_iter()
        .filter_map(|e| e.ok())
        .collect();

    entries
        .par_iter()
        .filter(|e| {
            !e.path()
                .components()
                .any(|c| c.as_os_str() == "node_modules")
        })
        .filter(|e| {
            e.path()
                .extension()
                .map_or(false, |ext| ext == "ts" || ext == "tsx")
        })
        .map(|e| e.path().to_owned())
        .collect()
}

fn benchmark_comparison(c: &mut Criterion) {
    let mut group = c.benchmark_group("ts_files");

    group.bench_function("sequential", |b| b.iter(collect_ts_files_seq));

    group.bench_function("parallel", |b| b.iter(collect_ts_files_par));

    group.finish();
}

criterion_group!(benches, benchmark_comparison);
criterion_main!(benches);

#[test]
fn verify_results() {
    let seq = collect_ts_files_seq();
    let par = collect_ts_files_par();

    assert_eq!(
        seq.len(),
        par.len(),
        "Both methods should find the same number of files"
    );
    println!("Found {} TypeScript files", seq.len());
}
